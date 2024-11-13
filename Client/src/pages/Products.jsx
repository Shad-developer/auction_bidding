import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import ProductCard from "./../components/cards/ProductCard";
import { Container, Heading } from "../components/common/Design";

export const Products = ({ products }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState(""); 
  const ProductsPerPage = 4;

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const filteredProducts = products?.filter((product) =>
    product?.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate indices for the current page's filtered products
  const offset = currentPage * ProductsPerPage;
  const currentProducts = filteredProducts.slice(
    offset,
    offset + ProductsPerPage
  );
  const totalPages = Math.ceil(filteredProducts.length / ProductsPerPage);

  return (
    <section className="product-home mt-36">
      <Container>
        <Heading title="Products" />

        {/* Search Input */}
        <div className="mb-8 flex justify-center">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(0); 
            }}
            className="border px-4 py-2 rounded w-full md:w-1/2"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 my-8">
          {currentProducts?.map((item, index) => (
            <ProductCard item={item} key={index} />
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-4 flex justify-center">
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            breakLabel={"..."}
            pageCount={totalPages}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={"flex justify-center items-center gap-2"}
            previousClassName={"px-3 py-2 bg-gray-200 rounded"}
            nextClassName={"px-3 py-2 bg-gray-200 rounded"}
            pageClassName={
              "px-3 py-2 cursor-pointer bg-gray-100 hover:bg-gray-300 rounded"
            }
            activeClassName={"bg-green-500 text-white"}
          />
        </div>
      </Container>
    </section>
  );
};
