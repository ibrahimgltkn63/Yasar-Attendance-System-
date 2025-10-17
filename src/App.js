import React, { useState } from 'react';
import { Camera, Users, FileText, Mail, QrCode, LogOut, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

const AttendanceSystem = () => {
  const [userRole, setUserRole] = useState(null);
  const [loginData, setLoginData] = useState({ id: '', password: '' });
  const [showQR, setShowQR] = useState(false);
  const [scanSuccess, setScanSuccess] = useState(false);
  const [language, setLanguage] = useState('tr');

  const translations = {
    tr: {
      university: 'Yaşar Üniversitesi',
      attendanceSystem: 'Yoklama Sistemi',
      studentIdLabel: 'Öğrenci/Personel No',
      passwordLabel: 'Şifre',
      studentLogin: 'Öğrenci Girişi',
      lecturerLogin: 'Öğretim Görevlisi Girişi',
      studentPanel: 'Öğrenci Paneli',
      lecturerPanel: 'Öğretim Görevlisi Paneli',
      logout: 'Çıkış',
      qrScan: 'QR Kod ile Yoklama',
      qrScanDesc: 'Sınıftaki QR kodu tarayarak yoklamanızı verebilirsiniz.',
      scanQR: 'QR Kod Tara',
      cameraOpening: 'Kamera açılıyor...',
      attendanceRecorded: 'Yoklama başarıyla kaydedildi!',
      myAttendance: 'Yoklama Durumum',
      critical: 'Kritik seviye! Dersten kalma riski!',
      warning: 'Dikkat! %70 sınırının altındasınız.',
      generateQR: 'QR Kod Oluştur',
      generateQRDesc: 'Ders için benzersiz QR kod oluşturun (10 dakika geçerli)',
      studentAttendanceStatus: 'Öğrenci Yoklama Durumu',
      studentNo: 'Öğrenci No',
      name: 'Ad Soyad',
      attendance: 'Katılım',
      ratio: 'Oran',
      status: 'Durum',
      action: 'İşlem',
      email: 'E-posta'
    },
    en: {
      university: 'Yaşar University',
      attendanceSystem: 'Attendance System',
      studentIdLabel: 'Student/Staff ID',
      passwordLabel: 'Password',
      studentLogin: 'Student Login',
      lecturerLogin: 'Lecturer Login',
      studentPanel: 'Student Panel',
      lecturerPanel: 'Lecturer Panel',
      logout: 'Logout',
      qrScan: 'QR Code Attendance',
      qrScanDesc: 'Scan the QR code in the classroom to record your attendance.',
      scanQR: 'Scan QR Code',
      cameraOpening: 'Camera opening...',
      attendanceRecorded: 'Attendance recorded successfully!',
      myAttendance: 'My Attendance',
      critical: 'Critical level! Risk of failing the course!',
      warning: 'Warning! You are below the 70% threshold.',
      generateQR: 'Generate QR Code',
      generateQRDesc: 'Generate unique QR code for class (valid for 10 minutes)',
      studentAttendanceStatus: 'Student Attendance Status',
      studentNo: 'Student ID',
      name: 'Full Name',
      attendance: 'Attendance',
      ratio: 'Ratio',
      status: 'Status',
      action: 'Action',
      email: 'Email'
    }
  };

  const t = translations[language];

  const courses = [
    { 
      id: 'ENGR1115', 
      name: language === 'tr' ? 'Programlamaya Giriş' : 'Introduction to Programming',
      instructor: 'Prof. Dr. Ahmet Yılmaz', 
      schedule: language === 'tr' ? 'Pazartesi 09:00' : 'Monday 09:00'
    },
    { 
      id: 'MATH1131', 
      name: language === 'tr' ? 'Analiz I' : 'Analysis I',
      instructor: 'Doç. Dr. Ayşe Demir', 
      schedule: language === 'tr' ? 'Salı 11:00' : 'Tuesday 11:00'
    },
    { 
      id: 'PHYS1121', 
      name: language === 'tr' ? 'Fizik I' : 'Physics I',
      instructor: 'Prof. Dr. Zeynep Arslan', 
      schedule: language === 'tr' ? 'Çarşamba 14:00' : 'Wednesday 14:00'
    },
    { 
      id: 'CE2104', 
      name: language === 'tr' ? 'İnşaat Malzemeleri' : 'Construction Materials',
      instructor: 'Öğr. Gör. Mehmet Kaya', 
      schedule: language === 'tr' ? 'Perşembe 10:00' : 'Thursday 10:00'
    }
  ];

  const studentAttendance = {
    'ENGR1115': { attended: 10, total: 17, percentage: 59 },
    'MATH1131': { attended: 13, total: 17, percentage: 76 },
    'PHYS1121': { attended: 11, total: 17, percentage: 65 },
    'CE2104': { attended: 8, total: 17, percentage: 47 }
  };

  const lecturerStudents = [
    { id: '20210001', name: 'Ali Yılmaz', attended: 10, total: 17, percentage: 59, status: 'warning' },
    { id: '20210002', name: 'Ayşe Kara', attended: 13, total: 17, percentage: 76, status: 'ok' },
    { id: '20210003', name: 'Mehmet Demir', attended: 8, total: 17, percentage: 47, status: 'critical' },
    { id: '20210004', name: 'Fatma Çelik', attended: 15, total: 17, percentage: 88, status: 'ok' },
    { id: '20210005', name: 'Ahmet Öz', attended: 7, total: 17, percentage: 41, status: 'critical' }
  ];

  const handleLogin = (role) => {
    if (loginData.id && loginData.password) {
      setUserRole(role);
    }
  };

  const handleQRScan = () => {
    setShowQR(true);
    setTimeout(() => {
      setScanSuccess(true);
      setTimeout(() => {
        setShowQR(false);
        setScanSuccess(false);
      }, 2000);
    }, 1500);
  };

  const sendEmailToStudent = (student) => {
    alert(`${t.email} ${language === 'tr' ? 'gönderildi' : 'sent'}: ${student.name} (${student.id})\n\n${language === 'tr' ? 'Konu: Devamsızlık Uyarısı' : 'Subject: Attendance Warning'}\n\n${language === 'tr' ? `Sayın ${student.name},\n\nDevamsızlık oranınız %${100 - student.percentage} olup, %30 sınırına ulaşmıştır. Dersten kalma riskiniz bulunmaktadır.\n\nYaşar Üniversitesi` : `Dear ${student.name},\n\nYour absence rate is ${100 - student.percentage}% and has reached the 30% limit. You are at risk of failing the course.\n\nYaşar University`}`);
  };

  const generateQRForCourse = (course) => {
    alert(`${language === 'tr' ? 'QR Kod oluşturuldu!' : 'QR Code generated!'}\n\n${language === 'tr' ? 'Ders' : 'Course'}: ${course.name}\n${language === 'tr' ? 'Kod' : 'Code'}: ${course.id}\n${language === 'tr' ? 'Zaman' : 'Time'}: ${new Date().toLocaleString(language === 'tr' ? 'tr-TR' : 'en-US')}\n\n${language === 'tr' ? 'Bu QR kod 10 dakika geçerlidir.' : 'This QR code is valid for 10 minutes.'}`);
  };

  if (!userRole) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md relative">
          <div className="absolute top-4 right-4">
            <button
              onClick={() => setLanguage(language === 'tr' ? 'en' : 'tr')}
              className="bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition font-semibold text-sm"
            >
              {language === 'tr' ? 'EN' : 'TR'}
            </button>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-blue-900 mb-3">{t.university}</h1>
            <p className="text-blue-700 text-xl font-semibold">{t.attendanceSystem}</p>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t.studentIdLabel}
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:border-transparent"
                value={loginData.id}
                onChange={(e) => setLoginData({...loginData, id: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t.passwordLabel}
              </label>
              <input
                type="password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:border-transparent"
                value={loginData.password}
                onChange={(e) => setLoginData({...loginData, password: e.target.value})}
              />
            </div>
            
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => handleLogin('student')}
                className="flex-1 bg-blue-900 text-white py-3 rounded-lg hover:bg-blue-800 transition font-semibold"
              >
                {t.studentLogin}
              </button>
              <button
                onClick={() => handleLogin('lecturer')}
                className="flex-1 bg-blue-700 text-white py-3 rounded-lg hover:bg-blue-600 transition font-semibold"
              >
                {t.lecturerLogin}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (userRole === 'student') {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-blue-900 text-white p-6 shadow-lg">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">{t.university}</h1>
              <p className="text-blue-200">{t.studentPanel} - {loginData.id}</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setLanguage(language === 'tr' ? 'en' : 'tr')}
                className="bg-blue-800 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
              >
                {language === 'tr' ? 'EN' : 'TR'}
              </button>
              <button
                onClick={() => setUserRole(null)}
                className="flex items-center gap-2 bg-blue-800 px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                <LogOut className="w-4 h-4" />
                {t.logout}
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto p-6">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Camera className="w-6 h-6 text-blue-900" />
              {t.qrScan}
            </h2>
            <p className="text-gray-600 mb-4">{t.qrScanDesc}</p>
            <button
              onClick={handleQRScan}
              className="bg-blue-900 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition font-semibold flex items-center gap-2"
            >
              <QrCode className="w-5 h-5" />
              {t.scanQR}
            </button>

            {showQR && (
              <div className="mt-4 p-6 bg-gray-50 rounded-lg text-center">
                {!scanSuccess ? (
                  <div>
                    <div className="w-48 h-48 bg-gray-200 mx-auto rounded-lg flex items-center justify-center mb-4">
                      <Camera className="w-16 h-16 text-gray-400 animate-pulse" />
                    </div>
                    <p className="text-gray-600">{t.cameraOpening}</p>
                  </div>
                ) : (
                  <div>
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <p className="text-green-600 font-semibold text-lg">{t.attendanceRecorded}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <FileText className="w-6 h-6 text-blue-900" />
              {t.myAttendance}
            </h2>
            <div className="space-y-4">
              {courses.map(course => {
                const attendance = studentAttendance[course.id];
                const isLow = attendance.percentage < 70;
                const isCritical = attendance.percentage < 50;
                
                return (
                  <div key={course.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-lg">{course.name}</h3>
                        <p className="text-sm text-gray-600">{course.instructor}</p>
                        <p className="text-sm text-gray-500">{course.schedule}</p>
                      </div>
                      <div className="text-right">
                        <div className={`text-2xl font-bold ${isCritical ? 'text-red-600' : isLow ? 'text-yellow-600' : 'text-green-600'}`}>
                          %{attendance.percentage}
                        </div>
                        <div className="text-sm text-gray-600">
                          {attendance.attended}/{attendance.total} {language === 'tr' ? 'ders' : 'classes'}
                        </div>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                      <div
                        className={`h-3 rounded-full ${isCritical ? 'bg-red-600' : isLow ? 'bg-yellow-500' : 'bg-green-500'}`}
                        style={{ width: `${attendance.percentage}%` }}
                      ></div>
                    </div>
                    {isLow && (
                      <div className={`flex items-center gap-2 mt-2 ${isCritical ? 'text-red-600' : 'text-yellow-600'}`}>
                        <AlertTriangle className="w-4 h-4" />
                        <span className="text-sm font-semibold">
                          {isCritical ? t.critical : t.warning}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gray-800 text-white p-6 shadow-lg">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">{t.university}</h1>
            <p className="text-gray-300">{t.lecturerPanel} - {loginData.id}</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setLanguage(language === 'tr' ? 'en' : 'tr')}
              className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition font-semibold"
            >
              {language === 'tr' ? 'EN' : 'TR'}
            </button>
            <button
              onClick={() => setUserRole(null)}
              className="flex items-center gap-2 bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-900 transition"
            >
              <LogOut className="w-4 h-4" />
              {t.logout}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <QrCode className="w-6 h-6 text-blue-900" />
            {t.generateQR}
          </h2>
          <p className="text-gray-600 mb-4">{t.generateQRDesc}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {courses.map(course => (
              <button
                key={course.id}
                onClick={() => generateQRForCourse(course)}
                className="border-2 border-gray-300 p-4 rounded-lg hover:border-blue-900 hover:bg-blue-50 transition text-left"
              >
                <div className="font-semibold">{course.name}</div>
                <div className="text-sm text-gray-600">{course.schedule}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Users className="w-6 h-6 text-blue-900" />
            {t.studentAttendanceStatus} - ENGR1115
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">{t.studentNo}</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">{t.name}</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">{t.attendance}</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">{t.ratio}</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">{t.status}</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">{t.action}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {lecturerStudents.map(student => (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm">{student.id}</td>
                    <td className="px-4 py-3 text-sm font-medium">{student.name}</td>
                    <td className="px-4 py-3 text-sm text-center">{student.attended}/{student.total}</td>
                    <td className="px-4 py-3 text-sm text-center">
                      <span className={`font-semibold ${student.status === 'critical' ? 'text-red-600' : student.status === 'warning' ? 'text-yellow-600' : 'text-green-600'}`}>
                        %{student.percentage}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      {student.status === 'ok' && <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />}
                      {student.status === 'warning' && <AlertTriangle className="w-5 h-5 text-yellow-500 mx-auto" />}
                      {student.status === 'critical' && <XCircle className="w-5 h-5 text-red-500 mx-auto" />}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {(student.status === 'warning' || student.status === 'critical') && (
                        <button
                          onClick={() => sendEmailToStudent(student)}
                          className="flex items-center gap-1 mx-auto text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                        >
                          <Mail className="w-4 h-4" />
                          {t.email}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceSystem;
