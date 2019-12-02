import React from 'react';
import Typography from '@material-ui/core/Typography';
import './TermsAndConditions.css'
import { Grid } from '@material-ui/core';
import ContactSection from '../Contact/ContactSection'

/**
 * Component for the Terms and Conditions page.
 * 
 * @author Ho Joo Lee
 * @version 1.0
 */

const TermsContent = (props) => {
  return (
    <Typography align="left" display="block" variant="body1" className="Terms-Content">
      {props.content}
    </Typography>
  )
}
const TermsHeader = () => {
  return (
    <React.Fragment>
      <br /> <br />
      <Typography align="center" display="block" variant="h4" className="Terms-Header">
        TERMS & CONDITIONS
      </Typography>
      <Grid container spacing={0} direction="column" alignItems="center" justify="center">
        <Typography id="terms-subheader1" align="left" display="block" variant="body1" className="Terms-Subheader">
          <span className="Terms-Span">Acceptance</span>
        </Typography>
        <TermsContent 
          content='Welcome to www.tempify.co (the "Site"). This page ("Notice") states the terms and conditions of the Site. 
          Please review this Notice carefully. By accessing, browsing, or using the Site ("Use"), all users and viewers 
          ("You," "you," "User," or "user") acknowledge acceptance of the terms and conditions listed in this Notice. 
          If you do not accept the terms and conditions listed in this Notice, please do not use the Site. Tempify Inc. 
          reserves the right to update this Notice from time to time in its sole discretion. 
          You should review this Notice periodically for updates and changes. 
          The Site and any related services are available to you, 
          provided that you can form legally binding agreements under applicable law. The Site is not available to minors. 
          If you are a minor, please do not use the Site.'/>
        <Typography align="left" display="block" variant="body1" className="Terms-Subheader">
          <span className="Terms-Span">License</span>
        </Typography>
        <TermsContent 
          content='Tempify grants you a limited, non-exclusive, non-transferable, non-assignable, 
          revocable license to view and temporarily download a copy of the materials displayed on the Site 
          solely for your personal and non-commercial use for yourself or within your organization. 
          All materials displayed or made available on the Site, including, but not limited to, graphics, 
          documents, text, images, sound, video, audio, artwork, software, and HTML code (collectively, the "Material") 
          are exclusive property of Tempify or its content suppliers.'/>
        <Typography align="left" display="block" variant="body1" className="Terms-Subheader">
          <span className="Terms-Span">User Submissions</span>
        </Typography>
        <TermsContent 
          content="The Site provides a forum for you to obtain employment and career information. 
          By submitting or entering your information to the Site (&quot;Submitted Material&quot;), you agree that you grant 
          TEMPIFY a perpetual, non-exclusive, irrevocable, royalty free, worldwide licence and right, but not the obligation, 
          to use, copy, modify, display, distribute, download, store, reproduce, transmit, publish, transfer, adapt, 
          create derivative works in any manner, in entirety or a portion of, of your Submitted Material, and by any means. 
          You authorize TEMPIFY to share Submitted Material with TEMPIFY clients or prospective clients. You acknowledge and 
          accept that TEMPIFY is only a passive forum for users to obtain employment and career information. 
          TEMPIFY does not screen or monitor any Submitted Materials. TEMPIFY, therefore, makes no representation regarding 
          the reliability, accuracy, completeness, validity, or truthfulness of any Submitted Materials. 
          TEMPIFY reserves the right, in its sole discretion, to delete, remove, refuse to display, or block any 
          Submitted Materials that TEMPIFY considers to be unacceptable. In the event TEMPIFY receives notification 
          regarding any unacceptable Submitted Materials, TEMPIFY may investigate such materials, in its sole discretion. 
          You acknowledge and agree that TEMPIFY may retain copies of your Submitted Materials and disclose your Submitted 
          Materials to a third party if TEMPIFY believes that it is necessary to: (i) protect the integrity of the Site; 
          (ii) protect rights of TEMPIFY; (iii) comply with any court order; (iv) comply with any legal or law enforcement 
          proceedings; (v) assert TEMPIFY’s claim under this Notice; and (vi) satisfy any claims regarding violations of 
          third party's rights."/>
        <Typography align="left" display="block" variant="body1" className="Terms-Subheader">
          <span className="Terms-Span">General Prohibitions</span>
        </Typography>
        <TermsContent 
          content="In connection with your use, you agree NOT to: violate any local, provincial, and federal rules, 
          regulations and statutes, including, but not limited to, Canadian export laws and regulations, anti-discrimination, 
          or equal opportunity employment laws; infringe any intellectual property and privacy rights, including, 
          but not limited to, patent, copyright, trademark, or trade secrets, of any third party; upload, post, transmit, 
          or store any material that: is unlawful, offensive, defamatory, fraudulent, deceptive, misleading, harmful, 
          threatening, harassing, obscene, or objectionable; breaches any of your contractual or confidentiality obligations;
          disrupts or interferes with the normal operations of the Site, such as posting or transmitting viruses, continuous 
          posting of repetitive materials, or posting abnormally large load; or are not permitted by TEMPIFY, including, 
          but not limited to, any unauthorized advertising materials, unsolicited promotional materials, &quot;junk 
          mail,&quot; &quot;spam mail,&quot; &quot;chain letters,&quot; pyramid schemes, franchises, distributorship, 
          club membership, sales arrangement, or otherwise unacceptable materials; violate other's privacy rights or personal 
          rights by abusing the Materials, including, but not limited to, harassing or &quot;stalking&quot; another person, 
          sending unsolicited e-mails, and collecting other's personal information; breach or attempt to breach any security 
          measures of the Site; use any device, process, or mechanism to monitor, retrieve, search, or access, e.g., 
          spider or robot, the Site or any Material without TEMPIFY's prior written consent;
          access or attempt to access any account or login of any third party listed on the Site;
          copy, modify, reproduce, delete, distribute, download, store, transmit, sell, re-sell, publish, reverse engineer, 
          or create derivative works of any Materials, except for materials that have been submitted and owned by you;
          post or submit any inaccurate, false, or incomplete information, such as your resume, biographical data, 
          or employment information; impersonate any person or entity; forge any header information in any electronic posting 
          or mail; or misrepresent yourself, your affiliation with any third party, or your entity."/>
        <Typography align="left" display="block" variant="body1" className="Terms-Subheader">
          <span className="Terms-Span">Specific Usage and Responsibilities</span>
        </Typography>
        <TermsContent 
          content="In addition to the general responsibilities listed in Section 5, you agree to comply with the following terms. 
          You further agree to: use the Site only for lawful purposes in searching for employment opportunities and career information;
          provide and maintain complete, correct, up-to-date, and accurate information on your submitted information;
          post materials for which you have all the necessary rights or licenses;
          use your own judgment, caution, and common sense in managing job opportunities and information offered by or 
          obtained from the Site; and bear the risks of any reliance or use of any Materials or any information provided 
          by any third party."/>
        <Typography align="left" display="block" variant="body1" className="Terms-Subheader">
          <span className="Terms-Span">Account and Password</span>
        </Typography>
        <TermsContent 
          content="The Site may present you with opportunities to open an account with the Site. It is your sole responsibility 
          to (a) maintain the confidentiality of your account logon and password; (b) frequently update and revise your password; 
          and (c) promptly notify TEMPIFY if there is any unauthorized use of your account or any breach of security."/>
        <Typography align="left" display="block" variant="body1" className="Terms-Subheader">
          <span className="Terms-Span">Employment</span>
        </Typography>
        <TermsContent 
          content="You understand and agree that TEMPIFY (a) does not warrant that you will receive any employment or job offers 
          through the Site; (b) shall not be responsible for any employment offers, employment screenings, employment decisions, 
          and actual employment presented by third parties; (c) does not guarantee the accuracy, completeness, validity, or 
          timeliness of information listed by any third parties; (d) shall not be responsible for any materials posted by 
          third parties, including, but not limited to, job openings and employment listings; and (e) is neither your employer 
          nor your agent in any regard, unless you enter into a express written employment agreement with TEMPIFY. You shall 
          use your own judgment, caution, and common sense in evaluating any prospective employers and any information provided 
          by any third party."/>
        <Typography align="left" display="block" variant="body1" className="Terms-Subheader">
          <span className="Terms-Span">Links to Third Party</span>
        </Typography>
        <TermsContent 
          content="The Site may have links, such as hyperlinks or buttons, directing access to third party's web sites 
          (&quot;Linked Sites&quot;). The Linked Sites may not be controlled or monitored by TEMPIFY. TEMPIFY shall not be responsible 
          for any materials, information, or content posted on the Linked Sites. The inclusion of the Linked Sites on the Site 
          does not imply any relationship or association between TEMPIFY and the owner of the Linked Sites or any endorsement 
          or sponsorship by TEMPIFY of the Linked Sites. TEMPIFY includes the Linked Sites solely for your convenience. 
          You are solely responsible for your access of the Linked Sites. You shall use your own judgement, caution, and 
          common sense in using the Linked Sites."/>
        <Typography align="left" display="block" variant="body1" className="Terms-Subheader">
          <span className="Terms-Span">Privacy</span>
        </Typography>
        <TermsContent 
          content={"Go to http://www.tempify.co for more details regarding our Website Privacy Policy."}/>
        <Typography align="left" display="block" variant="body1" className="Terms-Subheader">
          <span className="Terms-Span">Indemnification</span>
        </Typography>
        <TermsContent 
          content="You agree to indemnify, defend, and hold TEMPIFY, its affiliates, officers, directors, agents, employees, 
          harmless from any claims or demands of any third party, including, but not limited to, attorneys' fees and legal fees, 
          resulting from or arising out of your Use of the Site, your Submitted Materials, or your violation of any terms and 
          conditions of this Notice."/>
        <Typography align="left" display="block" variant="body1" className="Terms-Subheader">
          <span className="Terms-Span">Disclaimer</span>
        </Typography>
        <TermsContent 
          content="YOU ACKNOWLEDGE AND ACCEPT THAT: (A) YOU ASSUME ALL RISKS RELATED TO OR RESULTING FROM YOUR USAGE, VIEWING, 
          OR ACCESS OF THE SITE. THE SITE IS PROVIDED ON AN &quot;AS IS&quot; AND AN &quot;AS AVAILABLE&quot; BASIS. (B) TEMPIFY EXPRESSLY DISCLAIMS 
          ALL WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF 
          MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, OR WARRANTIES ARISING FROM COURSE OF PERFORMANCE, 
          COURSE OF DEALING OR USAGE. (C) TEMPIFY EXPRESSLY DISCLAIMS ALL WARRANTIES THAT (I) THE SITE AND ITS MATERIALS WILL 
          BE ERROR-FREE OR VIRUS-FREE; (II) THE SITE WILL BE UNINTERRUPTED AND SECURE; (III) THE SITE WILL BE UNINTERRUPTED AND 
          AVAILABLE AT ALL TIMES; (IV) THE SITE WILL MEET YOUR REQUIREMENTS; AND (V) THE RELIABILITY, ACCURACY, COMPLETENESS, 
          VALIDITY, OR TRUTHFULNESS OF ANY SUBMITTED MATERIALS."/>
        <Typography align="left" display="block" variant="body1" className="Terms-Subheader">
          <span className="Terms-Span">Liability and Limitations of Liability</span>
        </Typography>
        <TermsContent 
          content="YOU AGREE TO ASSUME ALL RISKS ASSOCIATED WITH, ARISING OUT OF, OR RESULTING FROM YOUR USE OF THE SITE OR 
          ANY SUBMITTED MATERIALS, INCLUDING, BUT NOT LIMITED TO, THE RISKS OF FINANCIAL LOSS, PHYSICAL HARM, PROPERTY DAMAGES, 
          DEALING WITH OTHER USERS OF THE SITE, STRANGERS, MINORS, OR FOREIGN NATIONALS, AND PERSONS ACTING UNDER FALSE PRETENSE. 
          YOU FURTHER AGREE TO RELEASE TEMPIFY, ITS AFFILIATES, OFFICERS, AGENTS, AND EMPLOYEES, HARMLESS FROM ALL CLAIMS, DEMANDS, 
          DAMAGES (DIRECT, INDIRECT, AND CONSEQUENTIAL) OF ANY KIND OR NATURE, KNOWN OR UNKNOWN, ASSOCIATED WITH, ARISING OUT OF, 
          OR RESULTING FROM YOUR USAGE OF THE SITE, YOUR SUBMITTED MATERIALS, ANY TRANSACTIONS RELATED TO OR RESULTING FROM YOUR 
          USE OF THE SITE. YOU FURTHER UNDERSTAND AND AGREE THAT IN NO EVENT TEMPIFY, ITS AFFILIATES, OFFICERS, AGENTS, EMPLOYEES, 
          AND SUPPLIERS SHALL BE LIABLE FOR ANY DIRECT, INDIRECT, CONSEQUENTIAL, INCIDENTAL, SPECIAL DAMAGES, OR DAMAGES FOR LOSS 
          OF PROFITS, GOODWILL, REVENUE, DATA, OR USE, INCURRED BY YOU OR ANY THIRD PARTY, WHETHER IN AN ACTION IN CONTRACT, TORT, 
          OR BREACH OR FAILURE OF WARRANTY, EVEN IF TEMPIFY HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. IN THE EVENT SOME 
          JURISDICTIONS PROHIBIT THE EXCLUSION OF CERTAIN WARRANTIES, THE LIMITATION OF LIABILITY, OR THE DISCLAIMER OF CERTAIN 
          DAMAGES, TEMPIFY'S AGGREGATE LIABILITY FOR ANY DAMAGES SHALL NOT EXCEED C$10."/>
        <Typography align="left" display="block" variant="body1" className="Terms-Subheader">
          <span className="Terms-Span">Termination</span>
        </Typography>
        <TermsContent 
          content="TEMPIFY has the right, in its sole discretion, to terminate any services of the Site and remove any Materials 
          from the Site. TEMPIFY may also terminate your access to any part or all of the services provided by TEMPIFY on the 
          Site at any time, with or without cause or notice, for any reasons. If you want to terminate your account, you may 
          only cease your Use of the Site. TEMPIFY shall not be responsible for maintaining or returning your Submitted 
          Materials, your account, or your logon and password. You should always maintain a copy of your Submitted Materials."/>
        <Typography align="left" display="block" variant="body1" className="Terms-Subheader">
          <span className="Terms-Span">Acceptance</span>
        </Typography>
        <TermsContent 
          content=""/>
        <Typography align="left" display="block" variant="body1" className="Terms-Subheader">
          <span className="Terms-Span">General</span>
        </Typography>
        <TermsContent
          content="You agree that there is no employment, partnership, agency, or joint venture relationship between you 
          and TEMPIFY arising out of or resulting from your Use of the Site. This Notice constitutes the entire agreement 
          between you and TEMPIFY governing your Use of the Site and is additional to any binding agreement between you and 
          TEMPIFY. This Notice is governed by the laws of the Province of British Columbia, Canada, without giving effect to 
          any principles of conflict of laws. TEMPIFY does not warrant that this Site will be lawful outside Canada. If you view, 
          access, submit, or download materials to and from the Site outside the Canada, you will be solely responsible for all 
          your actions and assume all risks. You may not use or export any Materials or make any copy or adaptation in violation 
          of any application laws, rules, or regulations, including, but not limited to, Canadian export laws and regulations. 
          The failure or delay by either party to enforce the terms of this Notice shall not be deemed as a waiver of such term. 
          Sections 4, 5, 6, 7, 9, 10, 12, 13, 14, and 15 shall survive any termination of this Notice for any reasons."/>
        <br/>
        <br/>
        <br/>
      </Grid>
      <ContactSection/>
    </React.Fragment>
  );
}

export default TermsHeader;