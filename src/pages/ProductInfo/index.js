import React from "react";
import { message, Button } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SetLoader } from "../../redux/loadersSlice";
import { GetProductById } from "../../apicalls/products";
import { GetAllBids } from "../../apicalls/products";
import Divider from "../../components/Divider";
import moment from "moment";
import BidModal from "./BidModal";

function ProductInfo() {
  const { user } = useSelector((state) => state.users);
  const [showAddNewBid, setShowAddNewBid] = React.useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = React.useState(0);
  const [product, setProduct] = React.useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetProductById(id);
      dispatch(SetLoader(false));

      if (response.success) {
        const bidsResponse = await GetAllBids({ poduct: id });

        setProduct({
          ...response.data,
          bids: bidsResponse.data,
        });
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  React.useEffect(() => {
    getData();
  }, []);

  return (
    product && (
      <div>
        <div className="grid grid-cols-2 mt-5">
          {/* images*/}
          <div className="flex flex-col gap-5">
            <img
              src={product.images[selectedImageIndex]}
              alt=""
              className="w-full h-98 object-cover rounded-md"
            />
            <div className="flex gap-3">
              {product.images.map((image, index) => {
                return (
                  <img
                    className={
                      "w-20 h-20 object-cover rounded-md cursor-pointer" +
                      (selectedImageIndex === index
                        ? "border-2 border-blue-700"
                        : "")
                    }
                    onClick={() => setSelectedImageIndex(index)}
                    src={image}
                    alt=""
                  />
                );
              })}
            </div>
            <Divider />
            <div>
              <h1> Added On</h1>
              <span> {moment(product.createdAt).format("DD,MMM'YYYY")}</span>
            </div>
          </div>
          {/* details*/}
          <div className="flex flex-col gap-3">
            <div>
              <h1 className="text-2xl font-semibold text-zinc-600">
                {product.name}
              </h1>
              <span> {product.description}</span>
            </div>
            <Divider />
            <div className="flex flex-col ">
              <h1 className="text-2xl font-semibold text-zinc-600">
                Product Details
              </h1>
              <div className="flex justify-between  mt-2 font-semibold text-zinc-600">
                <span>Price : </span>
                <span>Rs.{product.price}</span>
              </div>
              <div className="flex justify-between mt-2 font-semibold text-zinc-600">
                <span>Category : </span>
                <span className="uppercase">{product.category}</span>
              </div>
              <div className="flex justify-between mt-2 font-semibold text-zinc-600">
                <span>Bill Available : </span>
                <span>{product.billAvailable ? "Yes" : "No"}</span>
              </div>
              <div className="flex justify-between mt-2 font-semibold text-zinc-600">
                <span>Box Available : </span>
                <span>{product.boxAvailable ? "Yes" : "No"}</span>
              </div>
              <div className="flex justify-between mt-2 font-semibold text-zinc-600">
                <span>Accessories Available : </span>
                <span>{product.accessoriesAvailable ? "Yes" : "No"}</span>
              </div>
              <div className="flex justify-between mt-2 font-semibold text-zinc-600">
                <span>Warranty Available : </span>
                <span>{product.warantyAvailable ? "Yes" : "No"}</span>
              </div>
              <div className="flex justify-between mt-2 font-semibold text-zinc-600">
                <span>Originally Purchased Year : </span>
                <span>
                  {moment().subtract(product.age, "years").format("YYYY")}(
                  {product.age} years ago)
                </span>
              </div>
            </div>
            <Divider />
            <div className="flex flex-col ">
              <h1 className="text-2xl font-semibold text-zinc-600">
                Owner Details
              </h1>
              <div className="flex justify-between  mt-2 font-semibold text-zinc-600">
                <span>Name : </span>
                <span>{product.seller.name}</span>
              </div>
              <div className="flex justify-between mt-2 font-semibold text-zinc-600">
                <span>Email : </span>
                <span>{product.seller.email}</span>
              </div>
            </div>
            <Divider />
            <div className="flex flex-col">
              <div className="flex justify-between">
                <h1 className=" flex text-2xl font-semibold text-zinc-600">
                  Bid Details
                </h1>
                <Button
                  onClick={() => setShowAddNewBid(!showAddNewBid)}
                  disabled={user._id === product.seller._id}
                >
                  New Bid
                </Button>
              </div>
              {product.showBidsOnProductPage &&
                product?.bids?.map((bid) => {
                  return (
                    <div className="border border-gray-300 border-solid p-3 rounded mt-5">
                      <div className="flex justify-between text-gray-600">
                        <span>Name: </span>
                        <span> {bid.buyer.name}</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Bid Amount: </span>
                        <span> Rs. {bid.bidAmount}</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Bid Place at: </span>
                        <span>
                          {" "}
                          {moment(bid.createdAt).format("DD,MMM'YYYY")}
                        </span>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
        {showAddNewBid && (
          <BidModal
            product={product}
            reloadData={getData}
            showBidModal={showAddNewBid}
            setShowBidModal={setShowAddNewBid}
          />
        )}
      </div>
    )
  );
}

export default ProductInfo;
