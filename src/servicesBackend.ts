//SERVICES
//Interface for service with the serviceDescription being a string and a price of a number.
export interface Service {
    itemDescription: string;
    price: number;
}

//For changing the prices and descriptions of services available.
export const items: Service[] = [
    { itemDescription: "Whispering Amulet of Zephyr", price: 0.02},
    { itemDescription: "Arcane Lens of Divination", price: 500 },
    { itemDescription: "Goblin King's Rusty Crown", price: 5 },
    { itemDescription: "Bottled Phoenix Flame", price: 0.5 },
    { itemDescription: "Sylvan Cloak of Verdant Whispers", price: 27 },
    { itemDescription: "Dwarven Thunder Hammer", price: 9},
    { itemDescription: "Orb of Arcane Echoes", price: 0.2 },
    { itemDescription: "Druid's Grove-in-a-Bottle", price: 100 }
  
];


//DELIVERY AND PAYMENT OPTIONS
export interface DeliveryOption {
    name: string;
    price: number;
    description: string;
    default: boolean;
}

export interface PaymentOption {
    name: string;
    price: number;
    description: string;
    default: boolean;
}

// Define delivery options and associated costs
export const deliveryOptions = [
    {
        name: 'Online (SP)QR Code',
        price: 0,
        description: 'Convenient and immediate delivery online',
        default: true
    },
    {
        name: 'Armed Messenger (foot)',
        price: 0.5,
        description: 'Secure provision by a foot messenger - delivery time varies considerably based on location.',
        default: false
    },
    {
        name: 'Armed Courier (horse)',
        price: 2,
        description: 'Swift and expedited delivery service via horseback.',
        default: false
    },
];

// Define payment options and associated fees
export const paymentOptions = [
    {
        name: 'Payment upon arrival at toll station',
        price: 0,
        description: 'Change given but queues possible.',
        default: true,
    },
    {
        name: 'ImperiumCoins online payment',
        price: 0.5,
        description: 'Secure online payment in ImperiumCoins.',
        default: false,
    },
];


//CURRENCY CALCULATION AND CONVERTION
//FUNCTION - Calculate cost in decimal, then convert it into dnd money using our (fake) backend services.
export const calculateTotalAndConvertToDNDDenominations = (serviceDescription: string, quantity: number, price: number) => {
    const totalinDecimal = quantity * price;
    return convertToDNDDenominations(totalinDecimal);
};

// Function to convert decimal value to Roman currency denominations.
// We are using Augustan values here but these could be adjusted based on time period.
export const convertToDNDDenominations = (amount: number): string => {

    //Define our denominations array.
    const denominations = [
        { coinName: 'Platinum', value: 10 },
        { coinName: 'Gold', value: 1 },
        { coinName: 'Silver', value: 0.1 },
        { coinName: 'Copper', value: 0.01 },
    ];

    //Define Variables, amount comes in from parameters.
    let remainingAmount = amount;
    let result = '';

    //Loop through each denomination
    for (const denomination of denominations) {
        //Define count as the remainingAmount divided by the denominations value (ie how many fit in)
        const count = Math.floor(remainingAmount / denomination.value);
        //If more than zero fit in, append a statement to the result stating the count + coinname. Then deduct value from remainingAmount. 
        if (count > 0) {
            result += `${count} ${denomination.coinName} `;
            remainingAmount -= count * denomination.value;
        }
    }

    return result;
};