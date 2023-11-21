import React from "react";
import Itemcard from './Itemcard';
import data from './data';

const Home = () => {
    return (
        <>
            <h1 className="text-center mt-3">All Items</h1>
            <section className="py-4 container">   
                <div className="row justify-content-center">
                    {data.productData.map((item) => (
                        <Itemcard 
                            key={item.id}
                            img={item.Img}
                            title={item.title}
                            desc={item.desc} 
                            price={item.price} 
                            item={item}
                        />
                    ))}
                </div>
            </section>
        </>
    );
}

export default Home;
