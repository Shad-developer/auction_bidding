import { TiEyeOutline } from "react-icons/ti";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { NavLink } from "react-router-dom";

export const Table = ({
  products,
  isWon,
  isAdmin,
  handleSellProduct,
  handleDeleteProduct,
}) => {
  return (
    <>
      <div className="relative overflow-x-auto rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th scope="col" className="px-6 py-3">
                Image
              </th>
              <th scope="col" className="px-6 py-5">
                Title
              </th>
              <th scope="col" className="px-6 py-5">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Commission
              </th>
              <th scope="col" className="px-6 py-3">
                Price (USD)
              </th>

              {!isWon && (
                <>
                  <th scope="col" className="px-6 py-3">
                    Verified
                  </th>
                  {!isAdmin && (
                    <th scope="col" className="px-6 py-3">
                      Sold
                    </th>
                  )}
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {products?.map((product, index) => (
              <tr key={index} className="bg-white border-b hover:bg-gray-50 ">
                <td className="px-6 py-4">
                  <div className="flex justify-center items-center">
                  <img
                    className="w-16 h-16 rounded-md"
                    src={product?.image?.filePath}
                    alt={product?.title}
                    />
                    </div>
                </td>
                <td className="px-6 py-4">{product?.title.slice(0, 15)}...</td>
                <td className="px-6 py-4">{product?.category}</td>
                <td className="px-6 py-4">{product?.commission} %</td>
                <td className="px-6 py-4">{product?.price} $</td>

                {!isWon && (
                  <>
                    <td className="px-6 py-4">
                      {product?.isVerify ? (
                        <div className="flex items-center">
                          <div className="p-1 rounded-full bg-green text-white">
                            Yes
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <div className="p-1 rounded-full text-white bg-red-500">
                            No
                          </div>
                        </div>
                      )}
                    </td>
                  </>
                )}

                {!isAdmin && (
                  <>
                    <td className="px-6 py-4">
                      {product?.isSoldout ? (
                        <button className="bg-red-500 text-white py-1 px-3 rounded-lg">
                          Sold
                        </button>
                      ) : (
                        <button className="p-1 rounded-full bg-green text-white">
                          Sale
                        </button>
                      )}
                    </td>
                  </>
                )}

                <td className="px-6 py-4 text-center flex items-center gap-3 mt-3">
                  {/* view product */}
                  <NavLink
                    to={`/details/${product?._id}`}
                    aria-label="View product"
                    className="font-medium text-indigo-500"
                  >
                    <TiEyeOutline size={25} />
                  </NavLink>

                  {/* update product */}
                  {isAdmin ? (
                    <NavLink
                      to={`/product/admin/update/${product?._id}`}
                      aria-label="Edit product"
                      className="font-medium text-green-500"
                    >
                      <CiEdit size={25} />
                    </NavLink>
                  ) : (
                    <NavLink
                      to={`/product/update/${product?._id}`}
                      aria-label="Edit product"
                      className="font-medium text-green-500"
                    >
                      <CiEdit size={25} />
                    </NavLink>
                  )}

                  {/* delete product */}
                  <button
                    onClick={() => handleDeleteProduct(product._id)}
                    aria-label="Delete product"
                    className="font-medium text-red-500"
                  >
                    <MdOutlineDeleteOutline size={25} />
                  </button>

                  {/* sale product to highest user */}
                  {!product?.isSoldout && !isAdmin && (
                    <button
                      onClick={() => handleSellProduct(product._id)}
                      className={`p-1 rounded-md ${
                        product?.isVerify
                          ? "bg-green text-white"
                          : "bg-gray-500 text-white"
                      }`}
                      disabled={!product?.isVerify}
                    >
                      Sell
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
