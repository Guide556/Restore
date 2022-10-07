
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js';
import { useState,useEffect } from 'react';
import agent from '../../app/api/agent';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { useAppDispatch } from '../../app/store/configureStore';
import { setBasket } from '../basket/basketSlice';
import CheckoutPage from './CheckoutPage';

//public key from stripe

const stripePromise =
    loadStripe('pk_test_51Lq9tqEZo8SpPkFW2lIDqLusfNZttS1UI37A66EepNVvmGkUsSYrw7xA5twjCFqtdZxy5UoATgy57Y7CRD0XzwS600dNCLZdIK')
export default function CheckoutWrapper() {
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(true);

    //สร้างหรืออัพเดทใบสั่งซื้อส่งไปยัง Stripe (incomplete)
    useEffect(() => {
        agent.Payments.createPaymentIntent()
            .then(basket => dispatch(setBasket(basket)))
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
    }, [dispatch]);
    if (loading) return <LoadingComponent message='Loading checkout...' />

    return (
        <Elements stripe={stripePromise}>
            <CheckoutPage />
        </Elements>
    )
}