"use client";

import React from "react";
import { Row, Col, Card } from "antd";
import { Typography } from "antd";
import { NumericFormat } from "react-number-format";
import { ProductData } from "@/src/models/product.model";
import { productImageURL } from "@/src/utils/commonUtil";
import styled from "styled-components";

type Props = {
  products: ProductData[];
};

const ProductGrid = ({ products }: Props) => {
  // ตรวจสอบว่า products มีค่าและเป็นอาร์เรย์ก่อนทำการ map
  if (!Array.isArray(products) || products.length === 0) {
    return <Typography.Text>No products available.</Typography.Text>;
  }

  return (
    <Row gutter={[16, 16]}>
      {products.map((product) => (
        <Col md={8} xs={24} key={product.id}>
          <StyledCard
            cover={
              <StyledImage alt={product.name} src={productImageURL(product.image)} />
            }
            onClick={() => alert(JSON.stringify(product))}
          >
            <Card.Meta
              title={
                <Typography.Title level={4}>{product.name}</Typography.Title>
              }
              description={
                <Typography.Text>
                  <NumericFormat
                    value={product.price}
                    displayType={"text"}
                    thousandSeparator={true}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    suffix=" - "
                  />
                </Typography.Text>
              }
            />
          </StyledCard>
        </Col>
      ))}
    </Row>
  );
};

// Styled-components
const StyledCard = styled(Card)`
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  height: 100%; 
`;

const StyledImage = styled.img`
  width: 100%; 
  max-height: 200px;
  object-fit: cover;
`;

export default ProductGrid;
