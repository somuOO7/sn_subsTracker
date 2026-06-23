import { create } from 'zustand';
import { billingCycles } from '../constants';

export interface SubscriptionItem {
  id: string;
  productId: string;
  amount: number;
  billingCycle: billingCycles;
  startDate: string;
  endDate: string;
}

interface SubscriptionTypeItem {
  id: string;
  name: string;
  image: string;
}

interface SubscriptionState {
  subscriptionType: SubscriptionTypeItem[];
  subscriptionList: SubscriptionItem[];
  setSubscriptionType: (types: SubscriptionTypeItem[]) => void;
  setSubscription: (item: SubscriptionItem[]) => void;
}

const useSubscription = create<SubscriptionState>(set => ({
  subscriptionType: [],
  subscriptionList: [],

  setSubscriptionType: (types: SubscriptionTypeItem[]) =>
    set({ subscriptionType: types }),
  setSubscription: (list: SubscriptionItem[]) =>
    set({ subscriptionList: list }),
}));

export default useSubscription;
