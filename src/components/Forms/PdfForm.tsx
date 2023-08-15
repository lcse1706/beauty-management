import React from 'react';
import { PDFViewer, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: '20pt',
  },
  section: {
    backgroundColor: '#FFFFFF',
    border: '1pt solid #585757',
    borderRadius: '5pt',
    padding: '20pt',
    width: '500pt',
  },
  title: {
    fontSize: '18pt',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '10pt',
    color: '#4A4A4A',
  },
  line: {
    borderBottom: '1pt solid #585757',
    marginBottom: '10pt',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '6pt',
  },
  label: {
    color: '#4A4A4A',
  },
  value: {
    color: '#333333',
  },
  boldValue: {
    color: '#333333',
    fontWeight: 'bold',
  },
});

interface Receipt {
  receipt_id: string;
  name: string;
  email: string;
  treatment: string;
  price: string;
}

const PdfGenerator = () => {
  const pdfData: Receipt = JSON.parse(localStorage.getItem('pdfData') ?? '{}');

  return (
    <PDFViewer style={{ width: '100%', height: '100vh' }}>
      <Document>
        <Page size="A4" style={styles.container}>
          <View style={styles.section}>
            <Text style={styles.title}>Customer Receipt</Text>
            <View style={styles.line}></View>
            <View style={styles.row}>
              <Text style={styles.label}>Receipt number:</Text>
              <Text style={styles.value}>{pdfData.receipt_id}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Name:</Text>
              <Text style={styles.value}>{pdfData.name}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Email:</Text>
              <Text style={styles.value}>{pdfData.email}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Treatment:</Text>
              <Text style={styles.value}>{pdfData.treatment}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Price:</Text>
              <Text style={styles.boldValue}>{pdfData.price} kr</Text>
            </View>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};
export default PdfGenerator;
