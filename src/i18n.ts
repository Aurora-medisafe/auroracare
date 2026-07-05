// Internationalization (i18n) - Multi-language support
// Languages: English, Chinese (Simplified), Burmese

export type Language = 'en' | 'zh' | 'my';

export interface Translations {
  // App
  appName: string;
  
  // Navigation
  home: string;
  checkIn: string;
  meds: string;
  messages: string;
  settings: string;
  
  // Home
  goodMorning: string;
  goodAfternoon: string;
  goodEvening: string;
  howAreYouFeeling: string;
  imOkay: string;
  iNeedHelp: string;
  quickActions: string;
  todaysMedications: string;
  familyMessages: string;
  emergency: string;
  seeAll: string;
  
  // Check-In
  dailyCheckIn: string;
  howFeelingToday: string;
  feelingWell: string;
  needAssistance: string;
  tapBelow: string;
  yesConfirm: string;
  goBack: string;
  checkedInAt: string;
  backToHome: string;
  whyCheckInMatters: string;
  checkInDescription: string;
  
  // Medications
  medications: string;
  todaysProgress: string;
  taken: string;
  schedule: string;
  noMedications: string;
  allDone: string;
  allTakenToday: string;
  aboutMedications: string;
  aboutMedsDescription: string;
  
  // Messages
  familyMessagesTitle: string;
  noMessagesYet: string;
  readAloud: string;
  stop: string;
  quickReplies: string;
  tapToReply: string;
  usingReadAloud: string;
  readAloudDescription: string;
  
  // Health
  myHealthVitals: string;
  trackHealthVitals: string;
  vitalsDescription: string;
  recordNewReading: string;
  bloodPressure: string;
  heartRate: string;
  temperature: string;
  weight: string;
  bloodGlucose: string;
  recentHistory: string;
  updateReading: string;
  saveReading: string;
  
  // Settings / Profile
  profileSettings: string;
  myProfile: string;
  editName: string;
  enterYourName: string;
  phoneNumber: string;
  enterPhoneNumber: string;
  contactInfo: string;
  yourContacts: string;
  myContacts: string;
  familyContacts: string;
  noContactsYet: string;
  addContact: string;
  relationship: string;
  son: string;
  daughter: string;
  caregiver: string;
  other: string;
  
  // Privacy & Sharing
  privacySharing: string;
  shareMyLocation: string;
  letFamilySee: string;
  
  // Display
  display: string;
  textSize: string;
  chooseTextSize: string;
  normal: string;
  large: string;
  extraLarge: string;
  
  // About
  about: string;
  signOut: string;
  version: string;
  connectingFamilies: string;
  
  // SOS
  emergencySOS: string;
  holdToActivate: string;
  keepHolding: string;
  releaseToCancel: string;
  sosSent: string;
  familyAlerted: string;
  sending: string;
  alertingFamily: string;
  whenYouSendSOS: string;
  emergencyNotification: string;
  yourCurrentLocation: string;
  directLink: string;
  
  // Quick replies
  iLoveYou: string;
  thankYou: string;
  imFine: string;
  callMePlease: string;
  iNeedHelpShort: string;
  
  // Common
  back: string;
  cancel: string;
  save: string;
  confirm: string;
  yes: string;
  no: string;
  ok: string;
  done: string;
}

const translations: Record<Language, Translations> = {
  en: {
    // App
    appName: 'Protect Us',
    
    // Navigation
    home: 'Home',
    checkIn: 'Check-In',
    meds: 'Meds',
    messages: 'Messages',
    settings: 'Settings',
    
    // Home
    goodMorning: 'Good Morning',
    goodAfternoon: 'Good Afternoon',
    goodEvening: 'Good Evening',
    howAreYouFeeling: 'How are you feeling today?',
    imOkay: "I'm Okay",
    iNeedHelp: 'I Need Help',
    quickActions: 'Quick Actions',
    todaysMedications: "Today's Medications",
    familyMessages: 'Family Messages',
    emergency: 'Emergency',
    seeAll: 'See All',
    
    // Check-In
    dailyCheckIn: 'Daily Check-In',
    howFeelingToday: "How are you feeling today?",
    feelingWell: 'Feeling well, no concerns',
    needAssistance: 'I have a concern or need assistance',
    tapBelow: 'Tap one of the buttons below to let your family know.',
    yesConfirm: '✓ Yes, Confirm',
    goBack: '← Go Back',
    checkedInAt: 'Checked in at',
    backToHome: '🏠 Back to Home',
    whyCheckInMatters: 'Why Check-In Matters',
    checkInDescription: 'A simple daily check-in gives your family peace of mind. It only takes a moment!',
    
    // Medications
    medications: 'Medications',
    todaysProgress: "Today's Progress",
    taken: 'Taken',
    schedule: 'Schedule',
    noMedications: 'No Medications',
    allDone: 'All Done!',
    allTakenToday: "You've taken all your medications today.",
    aboutMedications: 'About Medications',
    aboutMedsDescription: 'Your medications are managed by your family. Contact them or your healthcare provider if you have questions.',
    
    // Messages
    familyMessagesTitle: 'Messages',
    noMessagesYet: 'No Messages Yet',
    readAloud: 'Read Aloud',
    stop: 'Stop',
    quickReplies: 'Quick Replies',
    tapToReply: 'Tap to send a quick response to your family',
    usingReadAloud: 'Using Read Aloud',
    readAloudDescription: 'Tap the "Read Aloud" button to hear your messages spoken in a clear, slow voice.',
    
    // Health
    myHealthVitals: 'My Health Vitals',
    trackHealthVitals: 'Track your health vitals here. Your family can see these readings.',
    vitalsDescription: 'Your health data helps your family monitor your wellbeing.',
    recordNewReading: 'Record New Reading',
    bloodPressure: 'Blood Pressure',
    heartRate: 'Heart Rate',
    temperature: 'Temperature',
    weight: 'Weight',
    bloodGlucose: 'Blood Glucose',
    recentHistory: 'Recent History',
    updateReading: '📝 Update Reading',
    saveReading: '💾 Save Reading',
    
    // Settings / Profile
    profileSettings: 'Profile',
    myProfile: 'My Profile',
    editName: '✏️ Edit Name',
    enterYourName: 'Enter your name',
    phoneNumber: 'Phone Number',
    enterPhoneNumber: 'Enter your phone number',
    contactInfo: 'Contact Information',
    yourContacts: 'Your Contacts',
    myContacts: 'My Contacts',
    familyContacts: 'Family Contacts',
    noContactsYet: 'No contacts added yet',
    addContact: '+ Add Contact',
    relationship: 'Relationship',
    son: 'Son',
    daughter: 'Daughter',
    caregiver: 'Caregiver',
    other: 'Other',
    
    // Privacy & Sharing
    privacySharing: 'Privacy & Sharing',
    shareMyLocation: 'Share My Location',
    letFamilySee: "Let your family see your location",
    
    // Display
    display: 'Display',
    textSize: 'Text Size',
    chooseTextSize: 'Choose comfortable text size',
    normal: 'Normal',
    large: 'Large',
    extraLarge: 'X-Large',
    
    // About
    about: 'About',
    signOut: 'Sign Out',
    version: 'Version',
    connectingFamilies: 'Connecting families with love and care, no matter the distance.',
    
    // SOS
    emergencySOS: 'Emergency SOS',
    holdToActivate: 'Hold the button for 1.5 seconds to send emergency alert to your family',
    keepHolding: 'Keep holding to send alert...',
    releaseToCancel: 'Release to cancel',
    sosSent: 'SOS Sent!',
    familyAlerted: 'Your family has been alerted and will help you soon.',
    sending: 'Sending...',
    alertingFamily: 'Alerting your family now.',
    whenYouSendSOS: 'When you send an SOS:',
    emergencyNotification: 'Emergency notification to family',
    yourCurrentLocation: 'Your current location',
    directLink: 'Direct link to contact you',
    
    // Quick replies
    iLoveYou: 'I love you!',
    thankYou: 'Thank you!',
    imFine: "I'm fine!",
    callMePlease: 'Call me please',
    iNeedHelpShort: 'I need help',
    
    // Common
    back: '← Back',
    cancel: 'Cancel',
    save: 'Save',
    confirm: 'Confirm',
    yes: 'Yes',
    no: 'No',
    ok: 'OK',
    done: 'Done',
  },
  
  zh: {
    // App
    appName: '守护亲情',
    
    // Navigation
    home: '首页',
    checkIn: '打卡',
    meds: '用药',
    messages: '消息',
    settings: '设置',
    
    // Home
    goodMorning: '早上好',
    goodAfternoon: '下午好',
    goodEvening: '晚上好',
    howAreYouFeeling: '您今天感觉怎么样？',
    imOkay: '我很好',
    iNeedHelp: '我需要帮助',
    quickActions: '快捷操作',
    todaysMedications: '今日用药',
    familyMessages: '家人消息',
    emergency: '紧急求助',
    seeAll: '查看全部',
    
    // Check-In
    dailyCheckIn: '每日打卡',
    howFeelingToday: '您今天感觉怎么样？',
    feelingWell: '感觉良好，没有不适',
    needAssistance: '我有问题或需要帮助',
    tapBelow: '点击下方按钮，让家人知道您的情况。',
    yesConfirm: '✓ 确认',
    goBack: '← 返回',
    checkedInAt: '打卡时间',
    backToHome: '🏠 返回首页',
    whyCheckInMatters: '为什么打卡很重要',
    checkInDescription: '简单的每日打卡让家人安心，只需要片刻时间！',
    
    // Medications
    medications: '用药管理',
    todaysProgress: '今日进度',
    taken: '已服用',
    schedule: '用药时间',
    noMedications: '暂无用药',
    allDone: '全部完成！',
    allTakenToday: '您今天已经服用了所有药物。',
    aboutMedications: '关于用药',
    aboutMedsDescription: '您的用药由家人管理。如有问题，请联系家人或医疗服务提供者。',
    
    // Messages
    familyMessagesTitle: '消息',
    noMessagesYet: '暂无消息',
    readAloud: '朗读',
    stop: '停止',
    quickReplies: '快捷回复',
    tapToReply: '点击向家人发送快捷回复',
    usingReadAloud: '使用朗读功能',
    readAloudDescription: '点击"朗读"按钮收听消息内容。',
    
    // Health
    myHealthVitals: '健康数据',
    trackHealthVitals: '在这里记录您的健康数据。家人可以看到这些记录。',
    vitalsDescription: '您的健康数据帮助家人监测您的健康状况。',
    recordNewReading: '记录新数据',
    bloodPressure: '血压',
    heartRate: '心率',
    temperature: '体温',
    weight: '体重',
    bloodGlucose: '血糖',
    recentHistory: '最近记录',
    updateReading: '📝 更新记录',
    saveReading: '💾 保存记录',
    
    // Settings / Profile
    profileSettings: '个人资料',
    myProfile: '我的资料',
    editName: '✏️ 修改姓名',
    enterYourName: '请输入您的姓名',
    phoneNumber: '电话号码',
    enterPhoneNumber: '请输入您的电话号码',
    contactInfo: '联系人信息',
    yourContacts: '您的联系人',
    myContacts: '我的联系人',
    familyContacts: '家人联系人',
    noContactsYet: '暂无联系人',
    addContact: '+ 添加联系人',
    relationship: '关系',
    son: '儿子',
    daughter: '女儿',
    caregiver: '护理人员',
    other: '其他',
    
    // Privacy & Sharing
    privacySharing: '隐私与分享',
    shareMyLocation: '分享位置',
    letFamilySee: '让家人查看您的位置',
    
    // Display
    display: '显示',
    textSize: '字体大小',
    chooseTextSize: '选择舒适的字体大小',
    normal: '正常',
    large: '大',
    extraLarge: '特大',
    
    // About
    about: '关于',
    signOut: '退出登录',
    version: '版本',
    connectingFamilies: '无论距离多远，用爱连接家人。',
    
    // SOS
    emergencySOS: '紧急求助',
    holdToActivate: '长按按钮1.5秒向家人发送紧急求助',
    keepHolding: '继续按住以发送求助...',
    releaseToCancel: '松开以取消',
    sosSent: '求助已发送！',
    familyAlerted: '您的家人已收到通知，将会尽快帮助您。',
    sending: '发送中...',
    alertingFamily: '正在通知家人...',
    whenYouSendSOS: '发送紧急求助时：',
    emergencyNotification: '向家人发送紧急通知',
    yourCurrentLocation: '您的当前位置',
    directLink: '直接联系您的方式',
    
    // Quick replies
    iLoveYou: '我爱你们！',
    thankYou: '谢谢！',
    imFine: '我很好！',
    callMePlease: '请打电话给我',
    iNeedHelpShort: '我需要帮助',
    
    // Common
    back: '← 返回',
    cancel: '取消',
    save: '保存',
    confirm: '确认',
    yes: '是',
    no: '否',
    ok: '好的',
    done: '完成',
  },
  
  my: {
    // App
    appName: 'ကျွန်ုပ်တို့ကို ကာကွယ်ပါ',
    
    // Navigation
    home: 'ပင်မ',
    checkIn: 'စစ်ဆေးခြင်း',
    meds: 'ဆေးဝါး',
    messages: 'မက်ဆိုက်များ',
    settings: 'ဆက်တင်များ',
    
    // Home
    goodMorning: 'မင်္ဂလာနံနက်',
    goodAfternoon: 'မင်္ဂလာနေ့',
    goodEvening: 'မင်္ဂလာည',
    howAreYouFeeling: 'ယနေ့သင်ခံစားနေသည်မှာ...',
    imOkay: 'ကျွန်ုပ်ကောင်းပါသည်',
    iNeedHelp: 'ကျွန်ုပ်အကူအညီလိုပါသည်',
    quickActions: 'လျှင်လမ်းဆွဲ',
    todaysMedications: 'ယနေ့ဆေးဝါးများ',
    familyMessages: 'မိသားစုမက်ဆိုက်များ',
    emergency: 'အရေးပေါ်',
    seeAll: 'အားလုံးကြည့်မည်',
    
    // Check-In
    dailyCheckIn: 'နေ့စဉ်စစ်ဆေးခြင်း',
    howFeelingToday: 'ယနေ့သင်ခံစားနေသည်မှာ...',
    feelingWell: 'ကျန်းမာပါသည်',
    needAssistance: 'ပြဿနာရှိပါသည်',
    tapBelow: 'မိသားစုကိုသိစေရန် အောက်ပါခလုတ်ကိုနှိပ်ပါ။',
    yesConfirm: '✓ သဘောတူပါသည်',
    goBack: '← ပြန်သွားမည်',
    checkedInAt: 'စစ်ဆေးခဲ့သည်',
    backToHome: '🏠 ပင်မသို့',
    whyCheckInMatters: 'စစ်ဆေးခြင်းအရေးပါ',
    checkInDescription: 'ရိုးရှင်းသောနေ့စဉ်စစ်ဆေးခြင်းသည် မိသားစုအတွက် စိတ်ငြိုငြင်မှုရပါသည်။',
    
    // Medications
    medications: 'ဆေးဝါး',
    todaysProgress: 'ယနေ့တိုးတက်မှု',
    taken: 'သောက်ပြီး',
    schedule: 'အချိန်ဇယား',
    noMedications: 'ဆေးဝါးမရှိ',
    allDone: 'ပြီးပါပြီ!',
    allTakenToday: 'ယနေ့ဆေးအားလုံးသောက်ပြီးပါပြီ။',
    aboutMedications: 'ဆေးဝါးအကြောင်း',
    aboutMedsDescription: 'သင့်ဆေးဝါးများကို မိသားစုကစီမံပါသည်။',
    
    // Messages
    familyMessagesTitle: 'မက်ဆိုက်များ',
    noMessagesYet: 'မက်ဆိုက်မရှိသေး',
    readAloud: 'ဖတ်ပေးမည်',
    stop: 'ရပ်မည်',
    quickReplies: 'မြန်မြန်ပြန်ပါ',
    tapToReply: 'မိသားစုကို မြန်မြန်ပြန်ရန် နှိပ်ပါ',
    usingReadAloud: 'ဖတ်ပေးခြင်းအသုံးပြုနည်း',
    readAloudDescription: 'မက်ဆိုက်များကိုဖတ်ပေးရန် "ဖတ်ပေးမည်" ခလုတ်ကိုနှိပ်ပါ။',
    
    // Health
    myHealthVitals: 'ကျန်းမာရေး',
    trackHealthVitals: 'ဤနေရာတွင် သင်၏ကျန်းမာရေးကိုမှတ်တမ်းတင်ပါ။',
    vitalsDescription: 'သင်၏ကျန်းမာရေးဒေတာသည် မိသားစုက သင်၏ကျန်းမာရေးကို စောင့်ကြည့်ရန် ကူညီပါသည်။',
    recordNewReading: 'မှတ်တမ်းတင်မည်',
    bloodPressure: 'သွေးချောင်း',
    heartRate: 'နှလုံးခုန်နှုန်း',
    temperature: 'အပူချိန်',
    weight: 'အလေးချိန်',
    bloodGlucose: 'သွေးတိုး',
    recentHistory: 'မှတ်တမ်းများ',
    updateReading: '📝 ပြင်ဆင်မည်',
    saveReading: '💾 သိမ်းမည်',
    
    // Settings / Profile
    profileSettings: 'ပရိုဖိုင်း',
    myProfile: 'ကျွန်ုပ်၏ပရိုဖိုင်း',
    editName: '✏️ အမည်ပြောင်းမည်',
    enterYourName: 'သင်၏အမည်ထည့်သွင်းပါ',
    phoneNumber: 'ဖုန်းနံပါတ်',
    enterPhoneNumber: 'ဖုန်းနံပါတ်ထည့်သွင်းပါ',
    contactInfo: 'ဆက်သွယ်ရေးအချက်အလက်',
    yourContacts: 'သင်၏ဆက်သွယ်ရေး',
    myContacts: 'ကျွန်ုပ်၏ဆက်သွယ်ရေး',
    familyContacts: 'မိသားစုဆက်သွယ်ရေး',
    noContactsYet: 'ဆက်သွယ်ရေးမရှိသေး',
    addContact: '+ ဆက်သွယ်ရေးထည့်သွင်းမည်',
    relationship: 'ဆက်ဆံထားမှု',
    son: 'သား',
    daughter: 'သမီး',
    caregiver: 'မွေးစားမ',
    other: 'အခြား',
    
    // Privacy & Sharing
    privacySharing: 'သီးသန့်မှုနှင့်မျှဝေခြင်း',
    shareMyLocation: 'ကျွန်ုပ်၏တည်နေရာကိုမျှဝေမည်',
    letFamilySee: 'မိသားစုကို သင်၏တည်နေရာကို တွေ့ရှိခွင့်ပေးမည်',
    
    // Display
    display: 'ပြသခြင်း',
    textSize: 'စာလုံးအရွယ်အစား',
    chooseTextSize: 'ဖတ်ရလွယ်သော စာလုံးအရွယ်အစားရွေးချယ်ပါ',
    normal: 'ရိုးရှင်း',
    large: 'ကြီး',
    extraLarge: 'အထူးကြီး',
    
    // About
    about: 'အကြောင်း',
    signOut: 'ထွက်မည်',
    version: 'ဗားရှင်း',
    connectingFamilies: 'အကွာအဝေးမရှိဘဲ မိသားစုများကို ချစ်ခြင်းဖြင့် ချိတ်ဆက်ပါသည်။',
    
    // SOS
    emergencySOS: 'အရေးပေါ်အကူအညီ',
    holdToActivate: 'မိသားစုသို့ အရေးပေါ်သတိပေးရန် 1.5 စက္ကန့်ဖိထားပါ',
    keepHolding: 'ဆက်ဖိထားပါ...',
    releaseToCancel: 'ပြန်လွှတ်လျှင် ပယ်မည်',
    sosSent: 'အရေးပေါ်ပို့ပြီး!',
    familyAlerted: 'မိသားစုသို့ သတိပေးပို့ပြီးဖြစ်ပါသည်။',
    sending: 'ပို့နေသည်...',
    alertingFamily: 'မိသားစုကိုသတိပေးနေသည်...',
    whenYouSendSOS: 'SOS ပို့သောအခါ:',
    emergencyNotification: 'မိသားစုသို့အရေးပေါ်သတိပေး',
    yourCurrentLocation: 'သင်၏လက်ရှိတည်နေရာ',
    directLink: 'တိုက်ရိုက်ဆက်သွယ်မှု',
    
    // Quick replies
    iLoveYou: 'ကျွန်ုပ်ချစ်ပါသည်!',
    thankYou: 'ကျေးဇူးတင်ပါသည်!',
    imFine: 'ကျွန်ုပ်ကောင်းပါသည်!',
    callMePlease: 'ဖုန်းခေါ်ပေးပါ',
    iNeedHelpShort: 'အကူအညီလိုပါသည်',
    
    // Common
    back: '← ပြန်သွားမည်',
    cancel: 'မလုပ်တော့',
    save: 'သိမ်းမည်',
    confirm: 'သဘောတူ',
    yes: 'ဟုတ်',
    no: 'မဟုတ်',
    ok: 'OK',
    done: 'ပြီးပါပြီ',
  },
};

export const languageNames: Record<Language, string> = {
  en: '🇬🇧 English',
  zh: '🇨🇳 中文',
  my: '🇲🇲 မြန်မာ',
};

export const getTranslations = (lang: Language): Translations => {
  return translations[lang];
};

export const getGreeting = (lang: Language): string => {
  const hour = new Date().getHours();
  if (hour < 12) return translations[lang].goodMorning;
  if (hour < 17) return translations[lang].goodAfternoon;
  return translations[lang].goodEvening;
};

export default translations;
