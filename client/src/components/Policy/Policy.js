import React from 'react';
import Typography from '@material-ui/core/Typography';
import './Policy.css'
import { Grid } from '@material-ui/core';


const PolicyContent = (props) => {
    return (
        <Typography align="left" display="block" variant="body1" className="PolicyContent border">
            {props.content}
        </Typography>
    );
}

const Policy = () => {
    return (
        <React.Fragment>
            <Typography align="center" display="block" variant="h4" className="PolicyHeader">
                PRIVACY POLICY
            </Typography>
            <Grid container spacing={0} direction="column" alignItems="center" justify="center">
                <PolicyContent 
                content='Welcome to www.tempify.co (the "Site"). This website privacy policy ("Policy") describes how Tempify Inc. may use 
                    and disclose personally identifiable information that we may collect about you through the Site ("Personal Information").'/>
                <PolicyContent 
                content="We use personal information which is collect at the time of registration for the Site for verification and enrollment 
                    into our employment system."/>
                <PolicyContent 
                content='We at Tempify Inc. respect your concerns about privacy. This Privacy Policy applies to (1) our job candidates, (2) 
                    our associates, who are people we source or place on assignment with one of our clients, or individuals to whom we provide 
                    career transition services, (3) users of the websites and apps listed here (the "Sites"), and (4) representatives of our clients 
                    and vendors.'/>
                <Typography align="left" className='PolicyTitle bold'>
                    Information we collect
                </Typography>
                <PolicyContent 
                content='We collect personal information about you in various ways, such as through our Sites and social media channels; 
                    at our events and through phone and fax; through job applications and in connection with in-person recruitment; and in 
                    connection with our interactions with clients and vendors. We may collect the following types of personal information 
                    (as permitted under local law):
                    Contact information (such as name, postal address, email address and telephone number); username and password when you 
                    register on our Sites; payment information (such as payment card number, expiration date, authorization number or security 
                    code);
                    geolocation data in connection with certain features of our Sites, such as the Tempify mobile app; information you provide 
                    about friends or other people you would like us to contact; and other information you may provide to us, such as in surveys 
                    or through the "Contact Us" feature on our Sites.
                    In addition, if you are an associate or job candidate and you apply for a position or create an account to apply for a 
                    position, we may collect the following types of personal information (as permitted under local law):
                    Employment and education history; language proficiencies and other work-related skills;
                    Social Security number, national identifier or other government-issued identification number; date of birth; gender; bank 
                    account information; citizenship and work authorization status; benefits information; tax-related information;
                    Information provided by references; and information contained in your resume or C.V., information you provide regarding your 
                    career interests, and other information about your qualifications for employment.'/>
                <Typography align="left" className='PolicyTitle bold'>
                    How we collect payment information
                </Typography>
                <PolicyContent 
                content='Payment card information is transmitted directly to two third-party payment card processors, Braintree and PayPal 
                    through an Internet connection secured by industry-standard Secure Socket Layer (SSL) encryption technology. Braintree and 
                    PayPal then communicate to Tempify whether your payment has cleared, but does not provide payment card information to 
                    Tempify. Braintree’s and PayPal’s policies are available on their websites.'/>
                <Typography align="left" className='PolicyTitle bold'>
                    Information collected by automated means
                </Typography>
                <PolicyContent 
                content='When you visit our Sites, we may collect certain information by automated means, such as cookies
                    A "cookie" is a file that websites send to a visitor’s computer or other Internet-connected device to uniquely identify the 
                    visitor’s browser or to store information or settings in the browser.
                    Please note, however, that without cookies you may not be able to use all of the features of our Sites. To the extent 
                    required by applicable law, we will obtain your consent before collecting personal information using cookies or similar 
                    automated means.'/>
                <Typography align="left" className='PolicyTitle bold'>
                    How we use the information we collect
                </Typography>
                <PolicyContent 
                content='We use the information described above to perform the following activities (as permitted under local law):
                    Providing workforce solutions and connecting people to work; creating and managing online accounts; processing payments; 
                    managing our client and vendor relationships;
                    sending promotional materials, alerts regarding available positions and other communications; communicating about, and 
                    administering participation in, special events, promotions, programs, offers, surveys, contests and market research;
                    Responding to individuals’ inquiries; operating, evaluating and improving our business (including developing, enhancing, 
                    analyzing and improving our services; managing our communications; performing data analytics; and performing accounting, 
                    auditing and other internal functions); protecting against, identifying and seeking to prevent fraud and other unlawful 
                    activity, claims and other liabilities; and complying with and enforcing applicable legal requirements, relevant industry 
                    standards, contractual obligations and our policies.
                    We also use third-party analytics services on our Sites, such as those of Google Analytics and Adobe Omniture. The analytics 
                    providers that administer these services use technologies such as cookies, web server logs and web beacons to help us 
                    analyze your use of our Sites. The information collected through these means (including IP address) may be disclosed to 
                    these analytics providers and other relevant third parties who use the information, for example, to evaluate use of the 
                    Sites. To learn more about these analytics services and how to opt out, please visit the following sites and any sites 
                    contained in the country-specific addenda:
                    Google Analytics: https://tools.google.com/dlpage/gaoptout
                    Adobe Analytics: http://www.adobe.com/privacy/analytics.html#1'/>
                <Typography align="left" className='PolicyTitle bold'>
                    Information we share
                </Typography>
                <PolicyContent 
                content='We do not disclose personal information we collect about you, except as described in this Privacy Policy or in separate 
                    notices provided in connection with particular activities. We share personal information with vendors who perform services 
                    on our behalf based on our instructions. We do not authorize these vendors to use or disclose the information except as 
                    necessary to perform services on our behalf or comply with legal requirements.
                    In addition, we may disclose information about you (i) if we are required to do so by law or legal process; (ii) to law 
                    enforcement authorities or other government officials based on a lawful disclosure request; and (iii) when we believe 
                    disclosure is necessary or appropriate to prevent physical harm or financial loss, or in connection with an investigation of 
                    suspected or actual fraudulent or illegal activity. We also reserve the right to transfer personal information we have about 
                    you in the event we sell or transfer all or a portion of our business or assets (including in the event of a reorganization, 
                    dissolution or liquidation).'/>
                <Typography align="left" className='PolicyTitle bold'>
                    Your rights and choices
                </Typography>
                <PolicyContent 
                content='We offer you certain choices in connection with the personal information we collect about you and how we communicate 
                    with you. To update your preferences, ask us to remove your information from our mailing lists, exercise your rights or 
                    submit a request, please email us at contact@tempify.co. To the extent provided by the law of your jurisdiction, you may 
                    request access to the personal information we maintain about you or request that we correct, amend, delete or block the 
                    information by contacting us as. Where provided by law, you may withdraw any consent you previously provided to us or 
                    object at any time on legitimate grounds to the processing of your personal information, and we will apply your preferences 
                    going forward.'/>
                <Typography align="left" className='PolicyTitle bold'>
                    How we protect personal information
                </Typography>
                <PolicyContent 
                content='We maintain administrative, technical and physical safeguards designed to protect the personal information you provide 
                    against accidental, unlawful or unauthorized destruction, loss, alteration, access, disclosure or use.'/>
                <Typography align="left" className='PolicyTitle bold'>
                    Updates to our policy
                </Typography>
                <PolicyContent 
                content='This Privacy Policy (including any addenda) may be updated periodically to reflect changes in our personal information 
                    practices. For significant changes, we will notify you by posting a prominent notice on our Sites indicating at the top of 
                    the Policy when it was most recently updated.'/>
                <Typography align="left" display="block" variant="body1" className="PolicyContent">
                    If you have any concerns or questions please email us at <a href='info.tempify@gmail.com'>info.tempify@gmail.com</a>
                </Typography>
            </Grid>
        </React.Fragment>
    );
}

export default Policy;