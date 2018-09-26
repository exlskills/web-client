import { defineMessages } from 'react-intl'

export default defineMessages({
  title: {
    id: 'dialogs.Billing.title',
    defaultMessage: 'EXLskills Coins & Billing'
  },
  headline: {
    id: 'dialogs.Billing.headline',
    defaultMessage: 'Manage your coins and payment methods'
  },
  loginRequiredHeadline: {
    id: 'dialogs.Billing.loginRequiredHeadline',
    defaultMessage: 'Missing Login'
  },
  loginRequiredDescription: {
    id: 'dialogs.Billing.loginRequiredDescription',
    defaultMessage:
      'You must login and/or sign up before you can make purchases on EXLskills.'
  },
  loginRequiredAction: {
    id: 'dialogs.Billing.loginRequiredAction',
    defaultMessage: 'Login Or Signup'
  },
  confirmCheckoutText: {
    id: 'dialogs.Billing.confirmCheckoutText',
    defaultMessage:
      'Would you like to confirm your purchase of {item} for {cost} coin(s)?'
  },
  confirmCheckoutTextCoinsAddition: {
    id: 'dialogs.Billing.confirmCheckoutTextCoinsAddition',
    defaultMessage:
      'Please note that an additional {cost} coin(s) (US${cost}) will be automatically bought for you to cover this purchase.'
  },
  confirmCheckoutTitle: {
    id: 'dialogs.Billing.confirmCheckoutTitle',
    defaultMessage: 'Confirm Checkout'
  },
  confirmCheckoutSubmitBtn: {
    id: 'dialogs.Billing.confirmCheckoutSubmitBtn',
    defaultMessage: 'Confirm'
  },
  confirmCheckoutCancelBtn: {
    id: 'dialogs.Billing.confirmCheckoutCancelBtn',
    defaultMessage: 'Cancel'
  },
  confirmPurchaseCoinsText: {
    id: 'dialogs.Billing.confirmPurchaseCoinsText',
    defaultMessage:
      'Would you like to confirm your purchase of {coins} coin(s) for {cost}?'
  },
  confirmPurchaseCoinsTitle: {
    id: 'dialogs.Billing.confirmPurchaseCoinsTitle',
    defaultMessage: 'Confirm Coins Purchase'
  },
  confirmPurchaseCoinsSubmitBtn: {
    id: 'dialogs.Billing.confirmPurchaseCoinsSubmitBtn',
    defaultMessage: 'Confirm'
  },
  confirmPurchaseCoinsCancelBtn: {
    id: 'dialogs.Billing.confirmPurchaseCoinsCancelBtn',
    defaultMessage: 'Cancel'
  },
  accountBalance: {
    id: 'dialogs.Billing.accountBalance',
    defaultMessage: 'Account Balance: $'
  },
  accountBalanceExplanation: {
    id: 'dialogs.Billing.accountBalanceExplanation',
    defaultMessage: `This is your current EXL Coins balance. You can use your coins to pay for certificates, live courses, and time with instructors. Each coin costs US$1 to purchase.`
  },
  paymentMethodTitle: {
    id: 'dialogs.Billing.paymentMethodTitle',
    defaultMessage: 'Payment Method'
  },
  paymentMethodExplanation: {
    id: 'dialogs.Billing.paymentMethodExplanation',
    defaultMessage: `In order to purchase coins, certificates, and live courses on EXLskills, you'll need to setup a credit card. You will be able to purchase coins as you need them, and your card will be charged once a month based on your usage. Don't buy anything? You won't be charged!`
  },
  forgetMyCreditCard: {
    id: 'dialogs.Billing.forgetMyCreditCard',
    defaultMessage: 'Forget My Credit Card'
  },
  youWontBeChargedNote: {
    id: 'dialogs.Billing.youWontBeChargedNote',
    defaultMessage: "You won't be charged until you make a purchase"
  },
  addCardBtnMsg: {
    id: 'dialogs.Billing.addCardBtnMsg',
    defaultMessage: 'Add Card'
  },
  buyCoinsTitle: {
    id: 'dialogs.Billing.buyCoinsTitle',
    defaultMessage: 'Buy Coins'
  },
  checkoutTitle: {
    id: 'dialogs.Billing.checkoutTitle',
    defaultMessage: 'Checkout'
  },
  completeCheckoutBtn: {
    id: 'dialogs.Billing.completeCheckoutBtn',
    defaultMessage: 'Go to Checkout'
  },
  youWillBeAskedToConfirmNote: {
    id: 'dialogs.Billing.youWillBeAskedToConfirmNote',
    defaultMessage:
      'You will be shown your final order summary and asked to confirm your purchase in the next dialog'
  },
  purchaseCoinsButtonText: {
    id: 'dialogs.Billing.purchaseCoinsButtonText',
    defaultMessage: 'Purchase (Total: US${coins})'
  },
  currentBillingPeriodNote: {
    id: 'dialogs.Billing.currentBillingPeriodNote',
    defaultMessage:
      "You have purchased {usage} coin(s) during this month's billing period. You will be charged US${usage} on {date}."
  },
  addPaymentMethodToPurchaseCoins: {
    id: 'dialogs.Billing.addPaymentMethodToPurchaseCoins',
    defaultMessage: 'Please add a payment method above to purchase coins'
  },
  usageForCurrentPeriodIsZeroNote: {
    id: 'dialogs.Billing.usageForCurrentPeriodIsZeroNote',
    defaultMessage:
      "You don't haven't purchased any coins during this billing period yet. Your billing period ends on {date}."
  },
  thankYouForYourPurchaseToast: {
    id: 'dialogs.Billing.thankYouForYourPurchaseToast',
    defaultMessage:
      'Thank you for your purchase! You will receive an email with your order confirmation and all further necessary instructions as necessary.'
  },
  anErrorOccurredPurchasingPleaseRetry: {
    id: 'dialogs.Billing.anErrorOccurredPurchasingPleaseRetry',
    defaultMessage:
      'An error occurred completing your purchase. Please retry in a few moments, and if you continue to receive this error, please contact support.'
  },
  addPaymentMethodToCompleteCheckout: {
    id: 'dialogs.Billing.addPaymentMethodToCompleteCheckout',
    defaultMessage: 'Please add a payment method below to checkout'
  },
  yourTotalCoveredByBalance: {
    id: 'dialogs.Billing.yourTotalCoveredByBalance',
    defaultMessage: '{cost} Coin(s)'
  },
  yourTotalMixed: {
    id: 'dialogs.Billing.yourTotalMixed',
    defaultMessage: '{cost} Coin(s) + US${extraCost}'
  },
  yourTotalFiat: {
    id: 'dialogs.Billing.yourTotalFiat',
    defaultMessage: 'US${cost}'
  }
})
