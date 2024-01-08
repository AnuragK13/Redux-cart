import ProductItem from './ProductItem';
import classes from './Products.module.css';

const dummy_products = [
  {
    id: 'p1',
    price: 60,
    title: 'first book',
  },
  {
    id: 'p2',
    price: 80,
    title: 'second book'
  }
];

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {dummy_products.map((product) => 
        (<ProductItem
          key= {product.id}
          id= {product.id}
          title= {product.title}
          price={product.price}
        />))}
        
      </ul>
    </section>
  );
};

export default Products;
