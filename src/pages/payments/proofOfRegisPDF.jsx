import PropTypes from 'prop-types';
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from '@react-pdf/renderer';
import { formatDateTime } from '../../utils/formatDateTime';

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: 'Helvetica',
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 50,
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  section: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  infoBlock: {
    display: 'flex',
    flexDirection: 'column',
    width: '45%',
  },
  label: {
    color: '#666',
    marginBottom: 2,
  },
  value: {
    fontWeight: 'bold',
  },
  borderTop: {
    borderTop: '1px solid #000',
    marginVertical: 20,
  },
  footer: {
    textAlign: 'right',
    fontWeight: 'bold',
  },
});

const ProofOfRegisPDF = ({ pay, schedule }) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.header}>
        <Image src="/design/logo-png.png" style={styles.logo} />
        <Text style={styles.title}>Bukti Pendaftaran</Text>
      </View>

      <View style={styles.borderTop}>
        <View style={styles.section}>
          <View style={styles.infoBlock}>
            <Text style={styles.label}>ID Peserta</Text>
            <Text style={styles.value}>
              {pay?.registrationID?.userID?.id_user}
            </Text>
            <Text style={styles.label}>Nama Peserta</Text>
            <Text style={styles.value}>
              {pay?.registrationID?.userID?.name}
            </Text>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>
              {pay?.registrationID?.userID?.email}
            </Text>
            <Text style={styles.label}>Nomor Telepon</Text>
            <Text style={styles.value}>
              {pay?.registrationID?.userID?.no_telp}
            </Text>
          </View>
          <View style={styles.infoBlock}>
            <Text style={styles.label}>ID Kegiatan</Text>
            <Text style={styles.value}>
              {pay?.registrationID?.eventID?.id_event}
            </Text>
            <Text style={styles.label}>Pelatihan</Text>
            <Text style={styles.value}>{schedule?.eventID?.name}</Text>
            <Text style={styles.label}>Jadwal</Text>
            {schedule.schedules.map((time, index) => (
              <Text key={index} style={styles.value}>
                {formatDateTime(time.start_time)}
              </Text>
            ))}
          </View>
        </View>
      </View>

      <View style={styles.borderTop}>
        <Text style={styles.footer}>ID Pembayaran: {pay.id_payment}</Text>
      </View>
    </Page>
  </Document>
);

ProofOfRegisPDF.propTypes = {
  pay: PropTypes.shape({
    id_payment: PropTypes.string.isRequired,
    registrationID: PropTypes.shape({
      userID: PropTypes.shape({
        id_user: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        no_telp: PropTypes.string.isRequired,
      }).isRequired,
      eventID: PropTypes.shape({
        id_event: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
  schedule: PropTypes.shape({
    eventID: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    schedules: PropTypes.arrayOf(
      PropTypes.shape({
        start_time: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default ProofOfRegisPDF;
