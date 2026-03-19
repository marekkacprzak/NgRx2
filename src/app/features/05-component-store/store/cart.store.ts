import { Injectable } from '@angular/core';
import { ComponentStore, OnStoreInit, OnStateInit } from '@ngrx/component-store';
import { CartItem } from '../../../shared/models/cart-item.model';

export interface CartState {
  items: CartItem[];
  initialized: boolean;
}

const initialState: CartState = {
  items: [],
  initialized: false,
};

@Injectable()
export class CartStore extends ComponentStore<CartState> implements OnStoreInit, OnStateInit {
  constructor() {
    super(initialState);
  }

  // Selectors (read)
  readonly items$ = this.select((state) => state.items);
  readonly totalItems$ = this.select((state) =>
    state.items.reduce((sum, item) => sum + item.quantity, 0),
  );
  readonly totalPrice$ = this.select((state) =>
    state.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
  );
  readonly initialized$ = this.select((state) => state.initialized);

  // Updaters (write)
  readonly addItem = this.updater((state, item: CartItem) => {
    const existing = state.items.find((i) => i.productId === item.productId);
    if (existing) {
      return {
        ...state,
        items: state.items.map((i) =>
          i.productId === item.productId
            ? { ...i, quantity: i.quantity + item.quantity }
            : i,
        ),
      };
    }
    return { ...state, items: [...state.items, item] };
  });

  readonly removeItem = this.updater((state, productId: number) => ({
    ...state,
    items: state.items.filter((i) => i.productId !== productId),
  }));

  readonly updateQuantity = this.updater(
    (state, update: { productId: number; quantity: number }) => ({
      ...state,
      items: state.items.map((i) =>
        i.productId === update.productId
          ? { ...i, quantity: update.quantity }
          : i,
      ),
    }),
  );

  readonly clearCart = this.updater((state) => ({
    ...state,
    items: [],
  }));

  // Lifecycle hooks
  ngrxOnStoreInit(): void {
    console.log('[CartStore] OnStoreInit — store utworzony');
  }

  ngrxOnStateInit(): void {
    console.log('[CartStore] OnStateInit — stan zainicjalizowany');
    this.patchState({ initialized: true });
  }
}
