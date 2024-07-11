import { Form, Input, Modal, message } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetLoader } from "../../redux/loadersSlice";
import { PlaceNewBid } from "../../apicalls/products";
import { AddNotification } from "../../apicalls/notifications";

function BidModal({ showBidModal, setShowBidModal, product, reloadData }) {
  const formRef = React.useRef(null);
  const rules = [
    { required: true, message: "Required Field. Please fillint he details." },
  ];
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);

  const onFinish = async (values) => {
    try {
      dispatch(SetLoader(true));
      const response = await PlaceNewBid({
        ...values,
        product: product._id,
        seller: product.seller._id,
        buyer: user._id,
      });
      dispatch(SetLoader(false));
      if (response.success) {
        message.success("Bid added successfully");

        //send notification to seller
        await AddNotification({
          title: "New Bid",
          message: `A new bid has been placed on your product ${product.name} by ${user.name} for ${values.bidAmount}`,
          user: product.seller._id,
          onClick: "/profile",
          read: false,
        });
        reloadData();
        setShowBidModal(false);
      }
    } catch (error) {
      message.error(error.message);
      dispatch(SetLoader(false));
    }
  };
  return (
    <Modal
      onCancel={() => setShowBidModal(false)}
      open={showBidModal}
      centered
      width={800}
      onOk={() => formRef.current.submit()}
    >
      <div className="flex flex-col mb-5 gap-5">
        <h1 className="text-2xl font-semibold text-zinc-600 text-center">
          Place a bid
        </h1>
        <Form layout="vertical" ref={formRef} onFinish={onFinish}>
          <Form.Item label="Bid Amount" name="bidAmount" rules={rules}>
            <Input />
          </Form.Item>
          <Form.Item label="Message" name="message" rules={rules}>
            <Input.TextArea />
          </Form.Item>
          <Form.Item label="Mobile" name="mobile" rules={rules}>
            <Input type="number" />
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
}

export default BidModal;
