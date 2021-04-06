package com.siap.dti.mapasdinamicos.utilities;

import java.text.SimpleDateFormat;
import java.util.Calendar;

public class Utils {
	
	public static String getFileNameUpload(String prefix, int userId){
        Calendar calendar = Calendar.getInstance();
        SimpleDateFormat fmt = new SimpleDateFormat("yyyyMMdd_HHmmss");
        fmt.setCalendar(calendar);
        return prefix + "_" + userId + "_" + fmt.format(calendar.getTime());
    }
	
	public static String getTimestamp() {
        Calendar calendar = Calendar.getInstance();
        SimpleDateFormat fmt = new SimpleDateFormat("yyyyMMdd_HHmmss");
        fmt.setCalendar(calendar);
        return fmt.format(calendar.getTime());
    }


}
