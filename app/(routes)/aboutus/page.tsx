import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Card } from "antd";
import { CardMedia } from "@mui/material";

export default function AccordionExpandIcon() {
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography>About Klepler</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Welcome to Klepler, your ally in efficient stock management. Our
            tailored software solutions empower businesses to track stock,
            optimize operations, and maximize profitability. With personalized
            support and ongoing assistance, we're committed to your success.
            Join us in enhancing efficiency and achieving greater stock
            management success.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography>Stock Management Simplified</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            At Klepler, we've redefined stock management with our intuitive
            system. Our software streamlines the entire process, from inventory
            tracking to supply chain monitoring. With real-time insights and
            powerful analytics, you'll make informed decisions effortlessly.
            Experience the ease and efficiency of our stock management system,
            designed to drive your business forward.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
