import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
    page: {
        margin: 0,
        padding: 20,
        fontSize: 11,
        lineHeight: 1.5,
        flexDirection: 'column',
    },
    header: {
        textAlign: 'center'
    },
    body: {
        padding: 20
    },
    signatures: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 40
    },
    signature: {
        textAlign: 'left',
        flexDirection: 'column',
    },
    table: {
        display: "table",
        width: "auto",
        borderStyle: "solid",
        borderWidth: 1,
        borderRightWidth: 0,
        borderBottomWidth: 0,
    },
    tableRow: {
        flexDirection: "row",
    },
    tableCol: {
        width: "16.67%",
        borderStyle: "solid",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
    },
    tableCell: {
        margin: "auto",
        padding: 5,
        fontSize: 10,
    },
});

const FormSOMekanik = () => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.header}>
                <Text>S/O : (No. SO)</Text>
            </View>

            <View style={styles.body}>
                <Text>Tanggal : </Text>
                <Text>Kepada Yth : (Mekanik)</Text>
                <Text>Dengan Hormat, : </Text>
                <Text>Dengan ini kami sampaikan agar saudara melakukan perbaikan sebagai berikut :</Text>
                <Text>No Plat : </Text>
                <Text>Perbaikan : </Text>
                <Text>Dikerjakan oleh : </Text>
                <Text>Borongan : </Text>
                <Text>Tgl Mulai : </Text>
                <Text>Tgl Selesai : </Text>

                <View style={styles.signatures}>
                    <View style={styles.signature}>
                        <Text>Ditinjau</Text>
                        <Text>(ttd - nama)</Text>
                    </View>
                    <View style={styles.signature}>
                        <Text>Disetujui</Text>
                        <Text>(ttd - nama)</Text>
                    </View>
                    <View style={styles.signature}>
                        <Text>Mandor</Text>
                        <Text>(ttd - nama)</Text>
                    </View>
                    <View style={styles.signature}>
                        <Text>Mekanik</Text>
                        <Text>(ttd - nama)</Text>
                    </View>
                </View>
            </View>
        </Page>
    </Document>
);

export default FormSOMekanik;