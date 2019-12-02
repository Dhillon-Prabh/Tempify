import React from "react";
import Typography from "@material-ui/core/Typography";
import "./Policy.css";
import { Grid } from "@material-ui/core";
import ContactSection from "../Contact/ContactSection";

/**
 *
 * This is the component for temp's hour input to request payment
 *
 * @author Oscar Au
 * @version 1.2
 *
 */

 /**
 * CSS styling for the component
 */
const PolicyContent = props => {
  return (
    <Typography
      align="left"
      display="block"
      variant="body1"
      className="PolicyContent border"
    >
      {props.content}
    </Typography>
  );
};

/**
 * Returns the component which nests static pricing information
 */
const Policy = () => {
  return (
    <React.Fragment>
      <br />
      <br />
      <Typography
        align="center"
        display="block"
        variant="h4"
        className="PolicyHeader"
      >
        PRICING
      </Typography>
      <br />
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
      >
        <PolicyContent content="Our payment structure is simple: Dental Offices are charged 15% surcharge." />
        <PolicyContent content="Payments are made via all major credit cards through the secure Payment Gateway (Braintree) or PayPal." />
        <PolicyContent content="The only information we need at the time of payment is, the number of hours the Dental Professional worked. Its best to ensure this information is correct in order to avoid processing delays and surcharges." />
        <Typography
          align="center"
          display="block"
          variant="h4"
          className="PolicyHeader"
        >
          HOW IT WORKS
        </Typography>
        <br />
        <PolicyContent content="After a Dental Professional has completed their day's work, simply go online and follow the payment process found in the schedule tab." />
        <PolicyContent content="Navigate to the date the Dental Professional worked, click on their name and a “payment” button will appear." />
        <PolicyContent content="Once the hours are entered and the correct amount is accepted- the payment is made. The payment includes the Dental Professionals wages and our service fee. You do not have to worry about any tax deductions,CPP, EI or Vacation pay. We will take care of all that!" />
        <PolicyContent content="It's as simple as that." />
        <Typography
          align="center"
          display="block"
          variant="h4"
          className="PolicyHeader"
        >
          SERVICE FEES
        </Typography>
        <br />
        <PolicyContent content="Take advantage of our introductory pricing.*" />
      </Grid>
      <div className="surchargeContainer"> 15% SURCHARGE</div>
      <ContactSection />
    </React.Fragment>
  );
};

export default Policy;
