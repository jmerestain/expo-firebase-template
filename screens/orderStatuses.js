// Constant variables for the numbers that represent the order statuses

// Vendor has rejected the user's order request
export const ORDER_REJECTED = 0

// User has added the order to her cart
export const ORDER_IN_CART = 1

// User is awaiting confirmation from vendor for her order
export const ORDER_PENDING = 2

// Vendor has accepted the order request and is awaiting user's payment
export const ORDER_TO_PAY = 3

// User has paid for the order and is awaiting the item to be shipped
export const ORDER_TO_SHIP = 4

// Order has been shipped and user is waiting to receive
export const ORDER_TO_RECEIVE = 5

// User has received the order
export const ORDER_COMPLETED = 6

// User cancelled the order
export const ORDER_CANCELLED = 7

// Order has been returned to the user
export const ORDER_RETURNED = 8