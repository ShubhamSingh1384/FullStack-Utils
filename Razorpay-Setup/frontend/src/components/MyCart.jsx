import axios from 'axios';
import React, { useState } from 'react';

const URL = import.meta.env.VITE_API_URL;

const MyCart = () => {
    const [amount, setAmount] = useState(0);

    const handlePaymentProcess = async () => {
        try {
            console.log("Payment process called from frontend");
            const razorpay_key = await axios.get(`${URL}/api/user/v1/getkey`);
            //   console.log("razorpay" , razorpay_key.data);
            const res = await axios.post(`${URL}/api/user/v1/payment-process`, {
                amount: Number(amount),
            });

            const orderID = res.data.order.id;
            console.log("res is ", res);

            const options = {
                key: razorpay_key?.data?.key,
                amount, 
                currency: 'INR',
                name: 'Shubham Singh',
                description: 'Test Transaction',
                order_id: orderID,
                callback_url:  `${URL}/api/user/v1/payment-verification`, // Your success URL
                prefill: {
                    name: 'Shubham Singh',
                    email: 'shubham@example.com',
                    contact: '9999999999'
                },
                theme: {
                    color: '#F37254'
                },
            };

            const rzp = new Razorpay(options);
            rzp.open();

        } catch (error) {
            console.error("Error in payment:", error.response?.data || error.message);
        }
    };

    return (
        <>
            <div>
                <input
                    onChange={(e) => setAmount(e.target.value)}
                    type="number"
                    value={amount}
                    name="amount"
                    placeholder="Enter amount"
                />
            </div>
            <br />
            <button onClick={handlePaymentProcess}>Process</button>
        </>
    );
};

export default MyCart;
