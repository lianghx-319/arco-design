import 'dayjs/locale/id';

const Calendar = {
  formatYear: 'YYYY',
  formatMonth: 'MMM YYYY',
  today: 'Hari ini',
  view: {
    month: 'Bulan',
    year: 'Tahun',
    week: 'Minggu',
    day: 'Hari',
  },
  month: {
    long: {
      January: 'Januari',
      February: 'Februari',
      March: 'Maret',
      April: 'April',
      May: 'Mungkin',
      June: 'Juni',
      July: 'Juli',
      August: 'Agustus',
      September: 'September',
      October: 'Oktober',
      November: 'November',
      December: 'Desember',
    },
    short: {
      January: 'Jan',
      February: 'Feb',
      March: 'Mar',
      April: 'Apr',
      May: 'Mungkin',
      June: 'Jun',
      July: 'Jul',
      August: 'Agu',
      September: 'Sept',
      October: 'Okt',
      November: 'Nov',
      December: 'Des',
    },
  },
  week: {
    long: {
      self: 'Minggu',
      monday: 'Senin',
      tuesday: 'Selasa',
      wednesday: 'Rabu',
      thursday: 'Kamis',
      friday: 'Jumat',
      saturday: 'Sabtu',
      sunday: 'Minggu',
    },
    short: {
      self: 'Minggu',
      monday: 'Sen',
      tuesday: 'Sel',
      wednesday: 'Rab',
      thursday: 'Kam',
      friday: 'Jum',
      saturday: 'Sab',
      sunday: 'Min',
    },
  },
};

export default {
  locale: 'id-ID',
  dayjsLocale: 'id',
  Calendar,
  DatePicker: {
    Calendar,
    placeholder: {
      date: 'Silakan pilih tanggal',
      week: 'Silakan pilih minggu',
      month: 'Silakan pilih bulan',
      year: 'Silakan pilih tahun',
      quarter: 'Silakan pilih perempat',
    },
    placeholders: {
      date: ['Mulai tanggal', 'Tanggal berakhir'],
      week: ['Mulailah minggu', 'Akhir minggu'],
      month: ['Mulai bulan', 'Akhir bulan'],
      year: ['Awal tahun', 'Akhir tahun'],
      quarter: ['Mulai kuartal', 'Seperempat akhir'],
    },
    selectTime: 'Pilih waktu',
    selectDate: 'Pilih tanggal',
    today: 'Hari ini',
    now: 'Sekarang',
    ok: 'Baik',
  },
  Drawer: {
    okText: 'Baik',
    cancelText: 'Membatalkan',
  },
  Empty: {
    noData: 'Tidak ada data',
  },
  Modal: {
    okText: 'Baik',
    cancelText: 'Membatalkan',
  },
  Pagination: {
    goto: 'Pergi ke',
    page: 'Halaman',
    countPerPage: ' / Halaman',
    total: 'Total: {0}',
  },
  Popconfirm: {
    okText: 'Baik',
    cancelText: 'Membatalkan',
  },
  Table: {
    okText: 'Baik',
    resetText: 'Setel ulang',
    sortAscend: 'Klik naik',
    sortDescend: 'Klik turun',
    cancelSort: 'Klik untuk membatalkan pengurutan',
  },
  TimePicker: {
    ok: 'Baik',
    placeholder: 'Pilih waktu',
    placeholders: ['Waktu mulai', 'Akhir waktu'],
    now: 'Sekarang',
  },
  Progress: {
    success: 'Lengkap',
    error: 'Gagal',
  },
  Upload: {
    start: 'Mulailah',
    cancel: 'Membatalkan',
    delete: 'Menghapus',
    reupload: 'Klik untuk mencoba lagi',
    upload: 'Unggah',
    preview: 'Pratinjau',
    drag: 'Klik atau seret file ke area ini untuk diunggah',
    dragHover: 'Lepaskan untuk mengupload',
    error: 'Kesalahan Unggahan',
  },
  Typography: {
    copy: 'Salinan',
    copied: 'Disalin',
    edit: 'Sunting',
    fold: 'Melipat',
    unfold: 'Membuka',
  },
  Transfer: {
    resetText: 'Setel ulang',
  },
  ImagePreview: {
    fullScreen: 'Layar penuh',
    rotateRight: 'Putar ke kanan',
    rotateLeft: 'Putar ke kiri',
    zoomIn: 'Perbesar',
    zoomOut: 'Perkecil',
    originalSize: 'Ukuran asli',
  },
};
