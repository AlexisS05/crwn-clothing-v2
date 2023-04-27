import { useContext } from 'react';
import { CartContext } from '../../contexts/cart-open.context';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';

import {
	CheckoutContainer,
	CheckoutHeader,
	HeaderBlock,
	Total,
} from './checkout.styles.jsx';

const Checkout = () => {
	const { cartItems, totalPrice } = useContext(CartContext);

	return (
		<CheckoutContainer>
			<CheckoutHeader>
				<HeaderBlock>Product</HeaderBlock>
				<HeaderBlock>
					<span>Description</span>
				</HeaderBlock>
				<HeaderBlock>
					<span>Quantity</span>
				</HeaderBlock>
				<HeaderBlock>
					<span>Price</span>
				</HeaderBlock>
				<HeaderBlock>
					<span>Remove</span>
				</HeaderBlock>
			</CheckoutHeader>
			{cartItems.map((item) => (
				<CheckoutItem key={item.id} cartItems={item}></CheckoutItem>
			))}
			{totalPrice > 1 ? (
				<Total as='span'>Total Price: ${totalPrice}</Total>
			) : (
				<span>There is no items in your cart.</span>
			)}
		</CheckoutContainer>
	);
};
export default Checkout;
