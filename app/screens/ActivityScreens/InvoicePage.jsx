import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView } from 'react-native';
import React, { useEffect,useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons'; 
import { TouchableOpacity } from 'react-native';
import * as Print from 'expo-print';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';

const InvoicePage = () => {
  const [htmlTemplate, setHtmlTemplate] = useState("");

  useEffect(() => {
    const loadTemplate = async () => {
      try {
        const asset = Asset.fromModule(require('../../../HtmlPages/Invoice.html'));
        await asset.downloadAsync();

        if (!asset.localUri) {
          console.error("Failed to load local URI for Invoice.html");
          return;
        }

        const fileUri = `${FileSystem.documentDirectory}Invoice.html`;

  
        const htmlContent = await FileSystem.readAsStringAsync(asset.localUri);
        setHtmlTemplate(htmlContent);

        console.log("HTML Template Loaded Successfully");

      } catch (error) {
        console.error("Error loading HTML template:", error);
      }
    };
    loadTemplate();
  }, []);

  const handleDownloadInvoices = async () => {
    try {
      if (!htmlTemplate) {
        console.error("HTML template is not loaded yet.");
        return;
      }

      console.log("Before Replacements:", htmlTemplate);

     
      const filledHtml = htmlTemplate
        .replace(/{{RIDE_ID}}/g, "JUSTAPRDID12345")
        .replace(/{{TIME_OF_RIDE}}/g, "Jan 8, 2025 10:50AM")
        .replace(/{{PICKUP_LOCATION}}/g, "48/320, Siri's Sri Nilayam, Hyderabad")
        .replace(/{{DROP_LOCATION}}/g, "Hitech City")
        .replace(/{{RIDE_CHARGE}}/g, "0")
        .replace(/{{BOOKING_FEES}}/g, "0")
        .replace(/{{TOTAL_AMOUNT}}/g, "220")
        .replace(/{{INVOICE_NO}}/g, "123456")
        .replace(/{{INVOICE_DATE}}/g, "Jan 8, 2025")
        .replace(/{{GST_NUMBER}}/g, "27AAAPL1234C1Z1")
        .replace(/{{CAPTAIN_NAME}}/g, "Bhaskar Davuluri")
        .replace(/{{VEHICLE_NUMBER}}/g, "TS09AB1234")
        .replace(/{{CUSTOMER_NAME}}/g, "Charitha")
        .replace(/{{CAPTAIN_FEE}}/g, "0")
        .replace(/{{CGST}}/g, "0")
        .replace(/{{SGST}}/g, "0")
        .replace(/{{IGST}}/g, "0")
        .replace(/{{RIDE_CHARGE}}/g, "0");

      console.log("After Replacements:", filledHtml);

      
      const { uri } = await Print.printToFileAsync({ html: filledHtml });
      console.log("PDF saved at:", uri);

    
      await Print.printAsync({ uri });

    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };
  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 50 }}>

<View style={styles.header}>
          <View style={styles.TitleContainer}>
            <Text style={styles.headerLeftText}>Trip Summary</Text>
            <Text style={styles.headerRightText}>Just Tap!</Text>
          </View>
          <View style={styles.headerContent}>
            <Text>Ride ID</Text>
            <Text>JUSTAPRDID12345</Text>
          </View>
          <View style={styles.headerContent}>
            <Text>Time of Ride</Text>
            <Text>Jan 8, 2025 10:50AM</Text>
          </View>
        </View>

        <View style={styles.MapContainer}>
          <Text>Map</Text>
        </View>

        {/* Location Container with Icons */}
        <View style={styles.locationContainer}>
          <View style={styles.locationRow}>
            <Ionicons name="location-sharp" size={20} color="green" />
            <Text style={styles.locationText}>48/320,Siri's Sri Nilayam,Ganesh Nagar,Chintal,Hyderabad,Telangana</Text>
          </View>
          <View style={styles.locationRow}>
            <Ionicons name="location-sharp" size={20} color="red" />
            <Text style={styles.locationText}>Hitech City</Text>
          </View>
        </View>

        <View style={styles.billDetailsContainer}>
          <Text style={styles.sectionTitle}>Bill Details</Text>
          <View style={styles.billItem}>
            <Text>Ride Charge</Text>
            <Text>₹0</Text>
          </View>
          <View style={styles.billItem}>
            <Text>Booking Fees & Convenience Charges</Text>
            <Text>₹0</Text>
          </View>
        </View>

        <View style={styles.paymentContainer}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          <View style={styles.paymentMethod}>
            <Image source={require('../../../assets/images/cash.png')} style={styles.paymentIcon} />
            <Text>Cash</Text>
            <Text>₹220</Text>
          </View>
        </View>

        <View style={styles.taxInvoiceContainer}>
          <Text style={styles.sectionTitle}>Tax Invoice</Text>
          <View style={styles.invoiceItem}><Text>Invoice No.</Text><Text>#123456</Text></View>
          <View style={styles.invoiceItem}><Text>Invoice Date</Text><Text>Jan 8, 2025</Text></View>
          <View style={styles.invoiceItem}><Text>State</Text><Text>Telangana</Text></View>
          <View style={styles.invoiceItem}><Text>Tax Category</Text><Text>GST</Text></View>
          <View style={styles.invoiceItem}><Text>Place of Supply</Text><Text>Hyderabad</Text></View>
          <View style={styles.invoiceItem}><Text>GST Number</Text><Text>27AAAPL1234C1Z1</Text></View>
          <View style={styles.invoiceItem}><Text>Captain Name</Text><Text>Bhaskar Davuluri</Text></View>
          <View style={styles.invoiceItem}><Text>Vehicle Number</Text><Text>TS09AB1234</Text></View>
          <View style={styles.invoiceItem}><Text>Customer Name</Text><Text>Charitha</Text></View>
          <View style={{ flexDirection: 'column', marginTop: 10 }}>
            <Text>Customer Pick Up Address</Text>
            <Text style={{ fontSize: 12, color: 'grey', flexWrap: 'wrap' }}>
              48/320, Siri's Sri Nilayam, Ganesh Nagar, Chintal, Hyderabad, Telangana
            </Text>
          </View>
          <View style={styles.invoiceItem}><Text style={{fontWeight:'bold',fontSize: 18}}>Total Amount</Text><Text style={{fontWeight:'bold',fontSize: 18}}>₹220</Text></View>
        </View>

        <View style={styles.billSummaryContainer}>
          <Text style={styles.sectionTitle}>Bill Breakdown</Text>
          <View style={styles.billItem}><Text>Captain Fee</Text><Text>₹0</Text></View>
          <View style={styles.billItem}><Text>CGST (0%)</Text><Text>₹0</Text></View>
          <View style={styles.billItem}><Text>SGST (0%)</Text><Text>₹0</Text></View>
          <View style={styles.billItem}><Text>IGST (0%)</Text><Text>₹0</Text></View>
          <View style={styles.billItem}><Text style={{fontWeight:'bold',fontSize: 18}}>Ride Charge</Text><Text style={{fontWeight:'bold',fontSize: 18}} >₹0</Text></View>

        </View>
 
        <TouchableOpacity style={styles.downloadButton} onPress={handleDownloadInvoices}>
          <Text style={styles.downloadButtonText}>Download Invoice</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default InvoicePage;

const styles = StyleSheet.create({
  safeContainer: { flex: 1, backgroundColor: '#f8f9fa' },
  container: { flex: 1, marginTop: 20, padding: 20 },
  header: { padding: 10, backgroundColor: '#fff', borderRadius: 10, marginBottom: 10 },
  TitleContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  headerLeftText: { fontSize: 18, fontWeight: 'bold' },
  headerRightText: { fontSize: 16, color: 'gray' },
  headerContent: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 },
  MapContainer: { backgroundColor: '#ddd', height: 200, borderRadius: 10, marginBottom: 10, justifyContent: 'center', alignItems: 'center' },

  locationContainer: { padding: 10, backgroundColor: '#fff', borderRadius: 10, marginBottom: 10 },
  locationRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 5 },
  locationText: { fontSize: 16, marginLeft: 5 },

  billDetailsContainer: { backgroundColor: '#fff', padding: 10, borderRadius: 10, marginBottom: 10 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  billItem: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 2 },
  paymentContainer: { backgroundColor: '#fff', padding: 10, borderRadius: 10, marginBottom: 10 },
  paymentMethod: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  paymentIcon: { width: 24, height: 24, marginRight: 10 },
  taxInvoiceContainer: { backgroundColor: '#fff', padding: 5, borderRadius: 10, marginBottom: 10 },
  invoiceItem: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 2 },
  billSummaryContainer: { backgroundColor: '#fff', padding: 10, borderRadius: 10 },
  downloadButton: { backgroundColor: '#0f4a97', padding: 10, borderRadius: 10, marginTop: 20 },
  downloadButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold', textAlign: 'center' },
});