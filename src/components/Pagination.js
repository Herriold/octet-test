import React, { useState, useEffect } from 'react'
import ReactPaginate from 'react-paginate';
import Products from '../pages/Products';
import { getProductLists } from '../actions/productLists';
 
export const Pagination = () => {
 const [productsPerPage] = useState(20);
 const [offset, setOffset] = useState(1);
 const [product, setAllProduct] = useState([]);
 const [pageCount, setPageCount] = useState(0)

 const productComponent = (data) => {
   return <Products produt={data} />
 }
 
 const getAllProducts = async () => {
   const products = await getProductLists();
   const slice = products.data.slice(offset - 1 , offset - 1 + productsPerPage)
 
   const productData = productComponent(slice)
   setAllProduct(productData)
   setPageCount(Math.ceil(products.data.length / productsPerPage))
 }
 
 const handlePageClick = (event) => {
   const selectedPage = event.selected;
   setOffset(selectedPage + 1)
 };
 
 useEffect(() => {
    getAllProducts()
 }, [offset])
 
 return (
   <>
     {product}
 
     <ReactPaginate
       previousLabel={"Previous"}
       nextLabel={"Next"}
       breakLabel={"..."}
       breakClassName={"break-me"}
       pageCount={pageCount}
       onPageChange={handlePageClick}
       containerClassName={"pagination"}
       subContainerClassName={"pages pagination"}
       activeClassName={"active"} />
   </>
 );
}