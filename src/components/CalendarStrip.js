import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';
import moment from 'moment';
import LeftArrow from '../assets/svg/LeftArrow';
import RightArrow from '../assets/svg/RightArrow';
import {appColors} from '../utils/appColors';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import {reportRead} from '../redux/ReportReadSlice';

const ITEM_WIDTH = 60;
const CalendarStrip = ({setApprovedJobs, orgId, setPdfFileName}) => {
  const dispatch = useDispatch();
  const today = moment();
  const [dates, setDates] = useState([]);
  const flatListRef = useRef();
  const [initialScrollReady, setInitialScrollReady] = useState(false);
  const [initialIndex, setInitialIndex] = useState(1);
  const isManualScrolling = useRef(false);

  const reportReadData = useSelector(state => state.reportReadReducer.data);

  const [isWhitDot, setWhiteDot] = useState(0);

  const getWeeksOfYear = year => {
    const weeks = [];
    let date = new Date(year, 0, 1); // January 1st

    // Adjust to the first Monday
    const day = date.getDay();
    const diff = (day <= 0 ? -6 : 1) - day;
    date.setDate(date.getDate() + diff);

    // Generate weeks
    while (date.getFullYear() <= year) {
      weeks.push(new Date(date));
      date.setDate(date.getDate() + 7);
    }

    return weeks;
  };

  // Example usage
  const year = 2025;
  const weeks = getWeeksOfYear(year);

  // useEffect(() => {
  //   const startDate = today.clone().subtract(initialIndex, 'days');
  //   const initialDates = Array.from({length: 100}, (_, i) =>
  //     startDate.clone().add(i, 'days'),
  //   );
  //   setDates(initialDates);
  //   setTimeout(() => {
  //     setInitialScrollReady(true);
  //   }, 0);
  // }, []);

  const handlePrevWeek = () => {
    setWhiteDot(isWhitDot - 1);
  };

  const handleNextWeek = () => {
    setWhiteDot(isWhitDot + 1);
  };

  useEffect(() => {
    const currentWeek = today.isoWeek();
    console.log('Weeek =====> ', currentWeek);
    setWhiteDot(currentWeek - 1);
    setInitialIndex(currentWeek);
  }, []);

  useEffect(() => {
    const payload = {
      id: orgId,
      dateFrom: moment()
        .year(2025)
        .isoWeek(isWhitDot + 1)
        .startOf('isoWeek')
        .format('YYYY-MM-DD'),
      dateTo: moment()
        .year(2025)
        .isoWeek(isWhitDot + 1)
        .endOf('isoWeek')
        .format('YYYY-MM-DD'),
    };
    console.log('Payload Read Data ===> ', payload);
    dispatch(reportRead(payload));
  }, [isWhitDot]);

  useEffect(() => {
    if (reportReadData != null) {
      setPdfFileName(reportReadData.report_pdf);
      setApprovedJobs(reportReadData.jobs);
    }
  }, [reportReadData]);

  const renderItem = ({item, index}) => {
    if (!item) return null;
    return (
      <TouchableOpacity
        onPress={() => {
          index < initialIndex ? setWhiteDot(index) : '';
        }}
        style={{
          justifyContent: 'center',
          marginLeft: 8,
        }}>
        <LinearGradient
          colors={
            isWhitDot == index
              ? ['#1AB2FF', '#FFB258']
              : initialIndex > index
              ? [appColors.white, appColors.white]
              : [appColors.lightGrey, appColors.lightGrey]
          } // Define gradient colors
          start={{x: 0, y: 0}} // Top-left corner
          end={{x: 1, y: 1}} // Bottom-right corner (Diagonal direction)
          style={{
            flex: 1,
            borderRadius: 16,
            // paddingHorizontal: 16,
            // paddingVertical: 16,
            borderWidth: 1,
            borderColor: appColors.lightGrey,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={
              isWhitDot == index ? styles.selectedWeek : styles.deselectedWeek
            }>
            {index + 1}
          </Text>
          <Text
            style={
              isWhitDot == index ? styles.selectedWeekP : styles.deselectedWeekP
            }>
            Week
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        horizontal
        data={weeks}
        renderItem={renderItem}
        keyExtractor={item => item}
        getItemLayout={(_, index) => ({
          length: ITEM_WIDTH,
          offset: ITEM_WIDTH * index,
          index,
        })}
        initialScrollIndex={initialIndex}
        // onScroll={handleScroll}
        // onMomentumScrollEnd={handleScrollEnd}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        snapToInterval={ITEM_WIDTH}
        snapToAlignment="start"
        decelerationRate="normal"
      />
      <View style={styles.header}>
        <TouchableOpacity onPress={handlePrevWeek} style={styles.navButton}>
          <Text style={styles.navButtonText}>
            <LeftArrow />
          </Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>
          {moment()
            .year(2025)
            .isoWeek(isWhitDot + 1)
            .startOf('isoWeek')
            .format('DD MMM')}{' '}
          -{' '}
          <Text style={styles.headerText}>
            {moment()
              .year(2025)
              .isoWeek(isWhitDot + 1)
              .endOf('isoWeek')
              .format('DD MMM')}
          </Text>
        </Text>
        <TouchableOpacity onPress={handleNextWeek} style={styles.navButton}>
          <Text style={styles.navButtonText}>
            <RightArrow />
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 18,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginVertical: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    fontFamily: 'Poppins',
    color: appColors.black,
  },
  navButton: {
    padding: 8,
  },
  navButtonText: {
    fontSize: 20,
    fontWeight: '600',
    color: appColors.black,
  },
  selectedWeek: {
    alignItems: 'center',
    paddingTop: 10,
    borderRadius: 20,
    paddingHorizontal: 14,
    marginHorizontal: 5,
    fontSize: 24,
    color: appColors.white,
  },
  deselectedWeek: {
    alignItems: 'center',
    paddingTop: 10,
    borderRadius: 20,
    paddingHorizontal: 14,
    marginHorizontal: 5,
    fontSize: 24,
    color: appColors.black,
  },
  selectedWeekP: {
    alignItems: 'center',
    padding: 0,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingBottom: 10,
    fontSize: 10,
    color: appColors.white,
  },
  deselectedWeekP: {
    alignItems: 'center',
    padding: 0,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingBottom: 10,
    fontSize: 10,
    color: appColors.black,
  },
  selected: {
    backgroundColor: appColors.black,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayLabel: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'Poppins',
    color: appColors.lightGrey,
    lineHeight: 26,
  },
  dayNumber: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Poppins',
    color: appColors.black,
  },
  selectedTextHead: {
    color: appColors.white,
    fontWeight: '700',
    fontFamily: 'Poppins',
    fontSize: 20,
  },
  selectedTextPara: {
    color: appColors.white,
    fontWeight: '500',
    fontFamily: 'Poppins',
    fontSize: 14,
  },
});

export default CalendarStrip;
