import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { delay, of } from 'rxjs';
import { User } from '../models/user.model';
import { Task } from '../models/task.model';
import { Product } from '../models/product.model';

const MOCK_USERS: User[] = [
  { id: 1, name: 'Jan Kowalski', email: 'jan@example.com' },
  { id: 2, name: 'Anna Nowak', email: 'anna@example.com' },
  { id: 3, name: 'Piotr Wiśniewski', email: 'piotr@example.com' },
  { id: 4, name: 'Maria Wójcik', email: 'maria@example.com' },
  { id: 5, name: 'Tomasz Kamiński', email: 'tomasz@example.com' },
];

let mockTasks: Task[] = [
  { id: 1, title: 'Nauczyć się NgRx Effects', completed: false },
  { id: 2, title: 'Zrozumieć Entity Adapter', completed: true },
  { id: 3, title: 'Skonfigurować Router Store', completed: false },
  { id: 4, title: 'Przetestować Component Store', completed: false },
];

let mockProducts: Product[] = [
  { id: 1, name: 'Laptop', price: 3999, category: 'Elektronika' },
  { id: 2, name: 'Klawiatura mechaniczna', price: 299, category: 'Elektronika' },
  { id: 3, name: 'Mysz bezprzewodowa', price: 149, category: 'Elektronika' },
  { id: 4, name: 'Monitor 27"', price: 1299, category: 'Elektronika' },
  { id: 5, name: 'Biurko regulowane', price: 1899, category: 'Meble' },
];

let nextTaskId = 5;
let nextProductId = 6;

export const mockApiInterceptor: HttpInterceptorFn = (req, next) => {
  // Normalize: strip trailing slashes and ensure path starts with /
  let path = req.url.replace(/\/+$/, '');
  // Handle both absolute (http://...) and relative URLs
  try {
    path = new URL(path, 'http://localhost').pathname;
  } catch {
    if (!path.startsWith('/')) path = '/' + path;
  }

  // Users — GET only
  if (path === '/api/users' && req.method === 'GET') {
    return of(new HttpResponse({ status: 200, body: MOCK_USERS })).pipe(delay(500));
  }

  // Tasks — CRUD
  if (path === '/api/tasks' && req.method === 'GET') {
    return of(new HttpResponse({ status: 200, body: [...mockTasks] })).pipe(delay(300));
  }
  if (path === '/api/tasks' && req.method === 'POST') {
    const body = req.body as Partial<Task>;
    const task: Task = { ...body, id: nextTaskId++ } as Task;
    mockTasks.push(task);
    return of(new HttpResponse({ status: 201, body: task })).pipe(delay(300));
  }
  if (path.match(/^\/api\/tasks\/\d+$/) && req.method === 'PUT') {
    const id = Number(path.split('/').pop());
    const taskBody = req.body as Partial<Task>;
    mockTasks = mockTasks.map((t) => (t.id === id ? { ...t, ...taskBody } : t));
    const updated = mockTasks.find((t) => t.id === id);
    return of(new HttpResponse({ status: 200, body: updated })).pipe(delay(300));
  }
  if (path.match(/^\/api\/tasks\/\d+$/) && req.method === 'DELETE') {
    const id = Number(path.split('/').pop());
    mockTasks = mockTasks.filter((t) => t.id !== id);
    return of(new HttpResponse({ status: 200, body: null })).pipe(delay(300));
  }

  // Products — CRUD (for @ngrx/data)
  // @ngrx/data uses plural URL for getAll, singular for add/update/delete
  if (path === '/api/products' && req.method === 'GET') {
    return of(new HttpResponse({ status: 200, body: [...mockProducts] })).pipe(delay(300));
  }
  if ((path === '/api/products' || path === '/api/product') && req.method === 'POST') {
    const body = req.body as Partial<Product>;
    const product: Product = { ...body, id: nextProductId++ } as Product;
    mockProducts.push(product);
    return of(new HttpResponse({ status: 201, body: product })).pipe(delay(300));
  }
  if (path.match(/^\/api\/products?\/\d+$/) && req.method === 'PUT') {
    const id = Number(path.split('/').pop());
    const prodBody = req.body as Partial<Product>;
    mockProducts = mockProducts.map((p) => (p.id === id ? { ...p, ...prodBody } : p));
    const updated = mockProducts.find((p) => p.id === id);
    return of(new HttpResponse({ status: 200, body: updated })).pipe(delay(300));
  }
  if (path.match(/^\/api\/products?\/\d+$/) && req.method === 'DELETE') {
    const id = Number(path.split('/').pop());
    mockProducts = mockProducts.filter((p) => p.id !== id);
    return of(new HttpResponse({ status: 200, body: null })).pipe(delay(300));
  }

  return next(req);
};
