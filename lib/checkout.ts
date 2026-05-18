export type CheckoutLineItem = {
  name: string;
  amount: number;
  size?: string;
  leather?: string;
};

export const createWhatsAppOrderUrl = (items: CheckoutLineItem[]) => {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919999999999';
  const message = items
    .map((item) => `${item.name} — ${item.size || 'size to confirm'} — ${item.leather || 'leather to confirm'}`)
    .join('\n');

  return `https://wa.me/${phone}?text=${encodeURIComponent(`Hello, I would like to enquire about:\n${message}`)}`;
};
