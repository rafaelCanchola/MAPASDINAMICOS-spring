package com.siap.dti.mapasdinamicos.utilities;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.TreeMap;
import java.util.zip.ZipEntry;
import java.util.zip.ZipFile;

/**
 *
 * @author
 */
public class UncompressorZIP {

    public UncompressorZIP() {
    }

    public void descomprimeZip(String archivoZip, TreeMap listUncomp, String destino) throws Exception {

        File unzipDestinationDirectory = new File(archivoZip);//.zip
        ZipFile zipFile = new ZipFile(unzipDestinationDirectory, ZipFile.OPEN_READ);

        Enumeration zipFileEntries = zipFile.entries();
        String nombre = unzipDestinationDirectory.getName();
        String n = nombre.substring(0, nombre.length() - 4);
        String r = null;
        while (zipFileEntries.hasMoreElements()) {
            ZipEntry entry = (ZipEntry) zipFileEntries.nextElement();//nombre del archivo dentro del zip
            String currentEntry = entry.getName();
            //File destFile = new File(unzipDestinationDirectory.getParentFile() + File.separator, currentEntry);
            File destFile = new File(destino + File.separator, currentEntry);
            File destinationParent = destFile.getParentFile();
            r = destinationParent.toString() + File.separator + n;
            destinationParent.mkdirs();
            if (!entry.isDirectory()) {
                BufferedInputStream is = new BufferedInputStream(zipFile.getInputStream(entry));
                int currentByte;
                int buffer = 8192;
                byte data[] = new byte[buffer];
                FileOutputStream fos = new FileOutputStream(destFile);
                BufferedOutputStream dest = new BufferedOutputStream(fos, buffer);
                while ((currentByte = is.read(data, 0, buffer)) != -1) {
                    dest.write(data, 0, currentByte);
                }
                dest.flush();
                dest.close();
                fos.close();
                is.close();
            }
            if (listUncomp.containsKey(unzipDestinationDirectory.getName().toLowerCase().substring(0, 7))) {
                ArrayList arrayList = (ArrayList) listUncomp.get(unzipDestinationDirectory.getName().toLowerCase().substring(0, 7));
                arrayList.add(destFile.getName());
            } else {
                ArrayList arrayList = new ArrayList();
                arrayList.add(destFile.getName());
                listUncomp.put(unzipDestinationDirectory.getName().toLowerCase().substring(0, 7), arrayList);
            }
        }
        zipFile.close();
    }
}
