import React from 'react';
import { PDFViewer, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import './PdfForm.scss';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

interface Receipt {
  data: {
    receipt_id: string;
    name: string;
    email: string;
    treatment: string;
    price: string;
  };
}

const PdfGenerator = ({ data }: Receipt) => {
  return (
    <PDFViewer style={{ width: '100%', height: '100vh' }}>
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text>{data.receipt_id}</Text>
            <Text>{data.name}</Text>
            <Text>{data.email}</Text>
            <Text>{data.treatment}</Text>
            <Text>{data.price}</Text>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default PdfGenerator;
