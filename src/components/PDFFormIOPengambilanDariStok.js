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

const PDFFormIOPengambilanDariStok = () => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.header}>
                <Text>I/O : (No. I.O)</Text>
            </View>

            <View style={styles.body}>
                <Text>Tanggal : </Text>
                <Text>No Plat : </Text>
                <Text>Kode : </Text>
                {/* ini buat table data */}
                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <View style={styles.tableRow}>
                            <View style={styles.tableCol}><Text style={styles.tableCell}>No.</Text></View>
                            <View style={styles.tableCol}><Text style={styles.tableCell}>Produk</Text></View>
                            <View style={styles.tableCol}><Text style={styles.tableCell}>Merek</Text></View>
                            <View style={styles.tableCol}><Text style={styles.tableCell}>Tipe</Text></View>
                            <View style={styles.tableCol}><Text style={styles.tableCell}>Satuan</Text></View>
                            <View style={styles.tableCol}><Text style={styles.tableCell}>qty</Text></View>
                        </View>
                    </View>

                    {/* Table Row 1 */}
                    <View style={styles.tableRow}>
                        <View style={styles.tableCol}><Text style={styles.tableCell}></Text></View>
                        <View style={styles.tableCol}><Text style={styles.tableCell}></Text></View>
                        <View style={styles.tableCol}><Text style={styles.tableCell}></Text></View>
                        <View style={styles.tableCol}><Text style={styles.tableCell}></Text></View>
                        <View style={styles.tableCol}><Text style={styles.tableCell}></Text></View>
                        <View style={styles.tableCol}><Text style={styles.tableCell}></Text></View>
                    </View>

                    {/* Table Row 2 */}
                    <View style={styles.tableRow}>
                        <View style={styles.tableCol}><Text style={styles.tableCell}></Text></View>
                        <View style={styles.tableCol}><Text style={styles.tableCell}></Text></View>
                        <View style={styles.tableCol}><Text style={styles.tableCell}></Text></View>
                        <View style={styles.tableCol}><Text style={styles.tableCell}></Text></View>
                        <View style={styles.tableCol}><Text style={styles.tableCell}></Text></View>
                        <View style={styles.tableCol}><Text style={styles.tableCell}></Text></View>
                    </View>
                </View>

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
                        <Text>Admin log</Text>
                        <Text>(ttd - nama)</Text>
                    </View>
                </View>
            </View>
        </Page>
    </Document>
);

export default PDFFormIOPengambilanDariStok;