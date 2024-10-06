"use client";

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/src/app/store/store";
import { deleteProduct, getProducts, productSelector } from "@/src/app/store/slices/productSlice";
import { userSelector } from "@/src/app/store/slices/userSlice";
import { useRouter } from "next/navigation";
import { Table, Button, Modal, Typography, Image, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { NumericFormat } from "react-number-format";
import dayjs from "dayjs";
import { ProductData } from "@/src/models/product.model";
import styled from "styled-components";
import { productImageURL } from "@/src/utils/commonUtil";

// TypeScript interfaces
interface Product {
  id: number;
  image: string;
  name: string;
  price: number;
  stock: number;
  createdAt: string;
}

// คอลัมน์ที่ใช้ใน Table ของ Ant Design
const columns = (router: ReturnType<typeof useRouter>) => [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    width: 90,
  },
  {
    title: 'Image',
    dataIndex: 'image',
    key: 'image',
    width: 70,
    render: (text: string) => (
      <StyledImage src={productImageURL(text)} preview={false} />
    ),
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    width: 350,
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
    width: 130,
    render: (text: number) => (
      <Typography.Text>
        <NumericFormat
          value={text}
          displayType={"text"}
          thousandSeparator={true}
          decimalScale={0}
          fixedDecimalScale={true}
        />
      </Typography.Text>
    ),
  },
  {
    title: 'Stock',
    dataIndex: 'stock',
    key: 'stock',
    width: 130,
  },
  {
    title: 'Timestamp',
    dataIndex: 'createdAt',
    key: 'createdAt',
    width: 230,
    render: (text: string) => (
      <Typography.Text>
        {dayjs(text).format("DD/MM/YYYY HH:mm")}
      </Typography.Text>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    width: 120,
    render: (text: string, record: Product) => (
      <div>
        <Button
          icon={<EditOutlined />}
          onClick={() => router.push(`/stock/edit?id=${record.id}`)}
        />
        <Popconfirm
          title="Are you sure to delete this product?"
          onConfirm={() => handleDelete(record)}
          okText="Yes"
          cancelText="No"
        >
          <Button
            icon={<DeleteOutlined />}
            danger
          />
        </Popconfirm>
      </div>
    ),
  },
];

const Stock = () => {
  const productReducer = useSelector(productSelector);
  const userReducer = useSelector(userSelector);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductData | null>(null);

  useEffect(() => {
    if (!userReducer.isAuthenticating) {
      dispatch(getProducts());
    }
  }, [dispatch, userReducer.isAuthenticating]);

  const handleDelete = async (product: Product) => {
    setSelectedProduct(product as unknown as ProductData);
    setOpenDialog(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedProduct) {
      const result = await dispatch(deleteProduct(String(selectedProduct.id)));
      if (result.meta.requestStatus === "fulfilled") {
        dispatch(getProducts());
        setOpenDialog(false);
      } else {
        alert("Failed to delete");
      }
    }
  };

  return (
    <Container>
      <Table
        dataSource={productReducer.products.map((product: ProductData) => ({
          id: product.id ?? 0,
          image: product.image || "",
          name: product.name,
          price: product.price,
          stock: product.stock,
          createdAt: product.createdAt ? dayjs(product.createdAt).format("YYYY-MM-DD HH:mm") : "",
        }))}
        columns={columns(router)}
        pagination={{ pageSize: 10 }}
        rowKey="id"
      />
      <StyledButton
        icon={<PlusOutlined />}
        onClick={() => router.push("/stock/add")}
      />
      
      {selectedProduct && (
        <Modal
          title="Confirm Deletion"
          visible={openDialog}
          onOk={handleDeleteConfirm}
          onCancel={() => setOpenDialog(false)}
          okText="Delete"
          cancelText="Cancel"
        >
          <Image
            width={100}
            height={100}
            alt="product image"
            src={productImageURL(selectedProduct.image)}
            style={{ width: 100, borderRadius: "5%", objectFit: "cover" }}
          />
          <Typography.Text>
            Confirm to delete the product: {selectedProduct.name}
          </Typography.Text>
          <Typography.Text type="danger">
            You cannot restore deleted product.
          </Typography.Text>
        </Modal>
      )}
    </Container>
  );
};

// Styled-components
const Container = styled.div`
  background-color: white;
  height: 70vh;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const StyledImage = styled(Image)`
  width: 70px;
  height: 70px;
  border-radius: 5%;
  object-fit: cover;
`;

const StyledButton = styled(Button)`
  margin: 16px; /* Adjust as needed */
  align-self: flex-end; /* Move button to the right */
  border: transparent;
    border-radius: 50%;
    background: #dd9237;
    color: #fff;
`;

export default Stock;

function handleDelete(record: Product): void {
  throw new Error("Function not implemented.");
}
