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
    tableParentRow: {
        flexDirection: "row",
        width: "100%",
        borderStyle: "solid",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderTopWidth: 0,
    },
    tableChildRow: {
        flexDirection: "row",
        width: "100%",
    },
    tableCol: {
        width: "12.5%", // 5 columns each get 10% width
        borderStyle: "solid",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
    },
    parentCol: {
        width: "37.5%", // Parent column covers 3 child columns (10% each * 3)
        borderStyle: "solid",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
    },
    childCol1: {
        width: "37.5%", // Parent column covers 3 child columns (10% each * 3)
        borderStyle: "solid",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        borderBottomWidth: 0,
    },
    childCol2: {
        width: "37.5%", // Parent column covers 3 child columns (10% each * 3)
        borderStyle: "solid",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        borderBottomWidth: 0,
    },
    childCol3: {
        width: "37.5%", // Parent column covers 3 child columns (10% each * 3)
    },
    parentCell: {
        margin: "auto",
        padding: 5,
        fontSize: 10,
    },
    tableCell: {
        margin: "auto",
        padding: 5,
        fontSize: 10,
    },
    childCol: {
        width: "12.5%", // Child columns get 10% each
        borderStyle: "solid",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
    },
    childCell: {
        padding: 5,
        fontSize: 10,
        textAlign: 'center',
    },
    colSpan: {
        display: "flex",
        flexDirection: "column",
    }
});

const PDFFormPOList = () => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.header}>
                <Text>P/O : (No. PO)</Text>
            </View>

            <View style={styles.body}>
                <Text>Tanggal : </Text>
                <Text>Kepada Yth : (Supplier)</Text>
                <Text>Dengan Hormat,</Text>
                <Text>Dengan ini kami sampaikan agar saudara/i memberikan barang-barang seperti yang tersebut dibawah ini.</Text>
                {/* ini buat table data */}
                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <View style={styles.tableRow}>
                            <View style={styles.tableCol}><Text style={styles.tableCell}>No.</Text></View>
                            <View style={styles.tableCol}><Text style={styles.tableCell}>Produk</Text></View>
                            <View style={styles.tableCol}><Text style={styles.tableCell}>Tipe</Text></View>
                            <View style={styles.tableCol}><Text style={styles.tableCell}>Satuan</Text></View>
                            <View style={styles.tableCol}><Text style={styles.tableCell}>qty</Text></View>
                            <View style={styles.parentCol}>
                                <View style={styles.tableParentRow}>
                                    <Text style={styles.parentCell}>Ketersediaan</Text>
                                </View>
                                <View style={styles.tableChildRow}>
                                    <View style={styles.childCol1}><Text style={styles.parentCell}>Merek</Text></View>
                                    <View style={styles.childCol2}><Text style={styles.parentCell}>qty</Text></View>
                                    <View style={styles.childCol3}><Text style={styles.parentCell}>Keterangan</Text></View>
                                </View>
                            </View>
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
                    <View style={styles.signature}>
                        <Text>Supplier</Text>
                        <Text>(ttd - nama)</Text>
                    </View>
                </View>
            </View>
        </Page>
        <Page size="A4" style={styles.page}>
            <View style={styles.header}>
                <Text>P/O : (No. PO)</Text>
            </View>

            <View style={styles.body}>
                <Text>Tanggal : </Text>
                <Text>Kepada Yth : (Supplier)</Text>
                <Text>Dengan Hormat,</Text>
                <Text>Dengan ini kami sampaikan agar saudara/i memberikan barang-barang seperti yang tersebut dibawah ini.</Text>
                {/* ini buat table data */}
                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <View style={styles.tableRow}>
                            <View style={styles.tableCol}><Text style={styles.tableCell}>No.</Text></View>
                            <View style={styles.tableCol}><Text style={styles.tableCell}>Produk</Text></View>
                            <View style={styles.tableCol}><Text style={styles.tableCell}>Tipe</Text></View>
                            <View style={styles.tableCol}><Text style={styles.tableCell}>Satuan</Text></View>
                            <View style={styles.tableCol}><Text style={styles.tableCell}>qty</Text></View>
                            <View style={styles.parentCol}>
                                <View style={styles.tableParentRow}>
                                    <Text style={styles.parentCell}>Ketersediaan</Text>
                                </View>
                                <View style={styles.tableChildRow}>
                                    <View style={styles.childCol1}><Text style={styles.parentCell}>Merek</Text></View>
                                    <View style={styles.childCol2}><Text style={styles.parentCell}>qty</Text></View>
                                    <View style={styles.childCol3}><Text style={styles.parentCell}>Keterangan</Text></View>
                                </View>
                            </View>
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
                    <View style={styles.signature}>
                        <Text>Supplier</Text>
                        <Text>(ttd - nama)</Text>
                    </View>
                </View>
            </View>
        </Page>
        <Page size="A4" style={styles.page}>
            <View style={styles.header}>
                <Text>P/O : (No. PO)</Text>
            </View>

            <View style={styles.body}>
                <Text>Tanggal : </Text>
                <Text>Kepada Yth : (Supplier)</Text>
                <Text>Dengan Hormat,</Text>
                <Text>Dengan ini kami sampaikan agar saudara/i memberikan barang-barang seperti yang tersebut dibawah ini.</Text>
                {/* ini buat table data */}
                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <View style={styles.tableRow}>
                            <View style={styles.tableCol}><Text style={styles.tableCell}>No.</Text></View>
                            <View style={styles.tableCol}><Text style={styles.tableCell}>Produk</Text></View>
                            <View style={styles.tableCol}><Text style={styles.tableCell}>Tipe</Text></View>
                            <View style={styles.tableCol}><Text style={styles.tableCell}>Satuan</Text></View>
                            <View style={styles.tableCol}><Text style={styles.tableCell}>qty</Text></View>
                            <View style={styles.parentCol}>
                                <View style={styles.tableParentRow}>
                                    <Text style={styles.parentCell}>Ketersediaan</Text>
                                </View>
                                <View style={styles.tableChildRow}>
                                    <View style={styles.childCol1}><Text style={styles.parentCell}>Merek</Text></View>
                                    <View style={styles.childCol2}><Text style={styles.parentCell}>qty</Text></View>
                                    <View style={styles.childCol3}><Text style={styles.parentCell}>Keterangan</Text></View>
                                </View>
                            </View>
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
                    <View style={styles.signature}>
                        <Text>Supplier</Text>
                        <Text>(ttd - nama)</Text>
                    </View>
                </View>
            </View>
        </Page>
    </Document>
);

export default PDFFormPOList;