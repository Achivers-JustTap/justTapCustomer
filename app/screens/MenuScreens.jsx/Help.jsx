import { StyleSheet, Text, View, TouchableOpacity, ScrollView,TextInput, Linking } from 'react-native';
import React, { useState } from 'react';

const Help = () => {
  const [expandedSection, setExpandedSection] = useState(null);
  const [expandedSubSection, setExpandedSubSection] = useState(null);
  const [expandedIssue, setExpandedIssue] = useState(null);

  const helpTopics = [
    {
      title: 'Ride Fare Related Issues',
      issues: [
        { question: "I have been charged higher than the estimated fare", answer: "The final fare depends on multiple factors including traffic, distance, and time taken." },
        { question: "I have been charged a cancellation fee", answer: "Cancellation fees are applied as per our policy if a ride is canceled after a certain period." },
        { question: "I didn't take the ride but I was charged for the same", answer: "Please check your trip history and contact support for further assistance." },
        { question: "I didn't receive cashback in my wallet", answer: "Cashback is credited within 24 hours. If not received, please contact support." },
        { question: "Billing related issues", answer: "For billing discrepancies, please check your invoice details and reach out to support." },
      ],
    },
    {
      title: 'Driver and Vehicle Related Issues',
      issues: [
        { question: "Driver was rude or unprofessional", answer: "We take customer feedback seriously. Please report the issue in the app." },
        { question: "Driver was driving dangerously", answer: "Safety is our priority. Please provide details so we can investigate." },
        { question: "Driver asked me to cancel the ride", answer: "We apologize for the inconvenience. Please report this issue for corrective action." },
        { question: "Driver was demanding extra cash", answer: "You can Directly report the issue to us by using call option or throught chat" },
        { question: "Driver/vehicle details didn't match", answer: "Always verify driver details before starting a ride. Report discrepancies immediately." },
        { question: "I have an issue with the given helmet", answer: "For hygiene and safety, report any issues with the provided helmet in the app." },
        { question: "I left an item/my personal belonging in the vehicle", answer: "" },
        { question: "I want to report an issue about the Driver/Ride", answer: "You can Directly report the issue to us by using call option or throught chat" },
      ],
    },
    {
      title: 'Payment Related Issues',
      issues: [
        {
          title: "Payments & Wallets",
          subIssues: [
            { question: "How can I change the payment method?", answer: "Before clicking on book now click on the payment option and select the payment method there" },
            { question: "How can I add money to my wallet?", answer: "Go to Payment Methods, click on the add money, enter amount then select payment method and finally complete payment" },
            { question: "How can I check my Just Tap! wallet balance?", answer: "Go to Payment Methods there you can find the wallet balance." },
            { question: "I am not able to change my payment method?", answer: "logout from your account then check again. If it still repeats the same then contact support." },
            { question: "My wallet balance is not updated after recharging?", answer: "It may take some time please restart your app again . If it repeats then contact support " },
            { question: "There is an unexplained deduction from my wallet?", answer: "Please check your transaction history in payment method or contact support" },
          ],
        },
      ],
    },
    {
      title: 'Parcel Related Issues',
      issues: [
        { question: "My Order was not delivered", answer: "Sorry for the inconvinence.Please send Us email with order id or directly contact our support team" },
        { question: "Items are damaged", answer: "Sorry for the inconvinence.Please send us the Images of damaged product and order id we will contact you soon." },
        { question: "Few items are missing from my order", answer: "Sorry for the inconvinence.Please send Us email with order id or directly contact our support team" },
        { question: "I am unable to contact the driver", answer: "Please check your connection and try agaian.If it repeats please contact our support team" },
        { question: "I have an issue with the payment", answer: "Can you provide more details about the issue? Are you experiencing a failed transaction, incorrect charges, or trouble completing the payment? Let mus know, and we’ll try to help!" },
        { question: "My issue is not mentioned above", answer: "You can directly send the issues throught mail or directly contact our support team" },
      ],
    },
    {
      title: 'Other Topics',
      issues: [
        {
          title: "Account & App",
          subIssues: [
            { question: "How can I book a ride?", answer: "Enter your Pickup Location ,Enter your Destination ,Select a Vehicle ,Book Your Ride .Simple, quick, and hassle-free!" },
            { question: "How can I schedule a ride in advance?", answer: "Go to the Reserved option.Select your Pickup and Drop Location.Choose a Vehicle that suits your needs.Set your Pickup Time or Drop-off Time in advance.Plan ahead for a smooth and timely ride!" },
            { question: "How do I turn off the Notifications?", answer: "In Your mobile you can diretly off the app notifications" },
            { question: "How can I update my mobile number?", answer: "Go to profile setting. open your profile there you can change your mobile number" },
            { question: "How do I update my email ID?", answer: "Go to profile setting. open your profile there you can change your Email" },
            { question: "How can I update the Language on my app?", answer: "Go to profile Setting there you will find Language setting option there you can choose your prefered language" },
            { question: "How to update my work/home or favourite locations?", answer: "To update your Work, Home, or Favourite Locations, follow these steps:Go to Settings or the Saved Locations section in the app.Select Work, Home, or Favourite Locations.Edit or enter the new address.Save the changes.Now, you can easily access your preferred locations for a quicker booking experience!" },
            { question: "How do I deactivate my account?", answer: "In Profile Setting you can directly click on the Deactivate Button to Deactivate account" },
            { question: "My app is crashing suddenly?", answer: "Delete You Exsisting version of JUST TAP! and then install the updated version.If it still continues contact our support team" },
            { question: "I am not able to find a driver for my ride?", answer: "If you're unable to find a driver, try waiting a few minutes, adjusting your pickup location, adding a tip, rebooking, or checking for app updates." },
          ],
        },
        {
          title: "Referrals",
          subIssues: [
            { question: "How do I refer a Person to Just Tap!?", answer: "Go to Menu there you will find Refer Friends Options, here you can refer your friends" },
            { question: "I didn't receive any referral credits?", answer: "Wait for Processing – Credits may take some time to reflect after the ride is completed.Check App Notifications – Sometimes, updates about rewards are sent there.Contact Support – If you still haven’t received the credits, reach out to customer support for assistance." },
          ],
        },
        {
          title:"Driver App Related Queries",
          subIssues:[
            {question:"How can I become a Just Tap! Earner?", answer:"Download JUST TAP EARNER! – Drive, Earn, Repeat! 💰🚀Complete the registration process and start earning effortlessly!" },
            {question:"Documents Required for Driver Registration", answer:'Recent Photograph of driver.Aadhar and pan number with Photogrphs. Driver license and Rc '}
        ]
          
        },
        {
          title:"Loans App Related Queries",
          subIssues:[
            {question:"How to download Just Tap! Loans App?", answer:"Go to menu and find Loans option and there you can download Loans app or Directly go to PlayStore/AppStore search for JUST TAP! Loans and install the app." },
            {question:"Documents Required for Loans Registration", answer:'Recent Photograph of user.Aadhar and pan numbers with Photogrphs.'},
            {question:"How to apply for Loans?",answer:'Check Your eligibility and select a loan type and submit your bank details and documents. If you match eligibility criteria the loan will be sanctioned'},
            {question:"Is it possible to take Loan as Driver as well as Customer?",answer:'Yes You can Take as Driver as well as customer but you need to '}
        ]
          
        },
      ],
    },
  ];

     
      return (

    <ScrollView style={styles.container}>
      {helpTopics.map((topic, index) => (
        <View key={index} style={styles.section}>
          <TouchableOpacity onPress={() => setExpandedSection(expandedSection === index ? null : index)}>
            <Text style={styles.sectionTitle}>{topic.title} {expandedSection === index ? '▼' : '▶'}</Text>
          </TouchableOpacity>
          {expandedSection === index && (
            <View style={styles.subSection}>
              {topic.issues.map((issue, i) => (
                typeof issue === 'string' ? (
                  <Text key={i} style={styles.issueText}>{issue}</Text>
                ) : (
                  <View key={i}>
                    <TouchableOpacity onPress={() => setExpandedIssue(expandedIssue === i ? null : i)}>
                      <Text style={styles.issueText}>{issue.question || issue.title} {expandedIssue === i ? '▼' : '▶'}</Text>
                    </TouchableOpacity>
                    {expandedIssue === i && issue.answer && (
                      <Text style={styles.answerText}>{issue.answer}</Text>
                    )}
                    {expandedIssue === i && issue.subIssues && (
                      issue.subIssues.map((subIssue, j) => (
                        <View key={j}>
                          <TouchableOpacity onPress={() => setExpandedSubSection(expandedSubSection === j ? null : j)}>
                            <Text style={styles.subIssueText}>{subIssue.question} {expandedSubSection === j ? '▼' : '▶'}</Text>
                          </TouchableOpacity>
                          {expandedSubSection === j && (
                            <Text style={styles.answerText}>{subIssue.answer}</Text>
                          )}
                        </View>
                      ))
                    )}
                  </View>
                )
              ))}
            </View>
          )}
        </View>
      ))}

<Text style={styles.Heading}>Contact Support</Text>
     <View style={styles.supportContainer}>
      <TextInput
        style={styles.input}
        placeholder="Your Email ID"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.inputMessage}
        placeholder="Type your issue"
        multiline
      />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Send</Text>
      </TouchableOpacity>
      </View>
      <Text style={styles.orText}>or</Text>
      <TouchableOpacity onPress={() => Linking.openURL('tel:8340863204')} style={styles.callButton}>
        <Text style={styles.callButtonText}>Call Support</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Help;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20, 
  },
  section: {
    marginBottom: 25,
    borderWidth: 1, 
    borderColor: '#ccc', 
    borderRadius: 10, 
   
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff', 
    backgroundColor: '#0f4a97', 

    paddingVertical: 15, 
    paddingHorizontal: 15, 
    borderTopLeftRadius: 10, 
    borderTopRightRadius: 10,
  },
  subSection: {
    paddingLeft: 20,
  },
  issueText: {
    fontSize: 16, 
    color: '#000', 

    paddingVertical: 8,
  },
  subIssueText: {
    paddingLeft: 20,
    fontSize: 16,
    color: '#000', 

    paddingVertical: 8, 
  },
  answerText: {
    fontSize: 15, 
    color: '#000', 

    paddingLeft: 25,
    paddingVertical: 5,
  },
  Heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#333',
  },
  supportContainer:{
    borderColor:'#0f4a97',
    borderWidth: 3,
    borderRadius: 10,
   alignItems:'center'
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginVertical: 10,
    fontSize: 16,
    backgroundColor: '#fff',
    width: '90%',
  },
  inputMessage: {
    textAlignVertical: 'top',
    paddingTop: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginVertical: 10,
    fontSize: 16,
    backgroundColor: '#fff',
    width: '90%',
    height: 150,
  },
  button: {
    backgroundColor: '#0f4a97',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
    width:'50%'
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  orText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginVertical: 10,
  },
  callButton: {
    backgroundColor: '#28a745',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
    marginBottom: 100,
  },
  callButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
