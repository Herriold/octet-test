
import React from 'react';
import Image from '../components/Image';
import { base_url } from '../utils/constants';


const Products = ({produt}) => {
    
    return (
        <div className="container">
            {produt?.map(item => {
                return (
                    item.PathPhoto && (
                        <div className="card" key={item.CodeArticle}>
                            <Image src={`${base_url}${item.PathPhoto}`} />
                            <span className="libele">{item.Libelle}</span>
                        </div>
                    )
                )
            })

            }
        </div>
    );
};

export default Products;