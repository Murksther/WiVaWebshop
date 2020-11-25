package com.example.WiVaServer.product.controller;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.example.WiVaServer.product.service.ProductService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.*;
import java.net.URLConnection;
import java.util.Arrays;
import java.util.Base64;
import java.util.Map;

import static com.example.WiVaServer.product.util.AppConstants.CLOUDINARY_HOME;
import static com.example.WiVaServer.product.util.AppConstants.CLOUDINARY_KEY;
import static com.example.WiVaServer.product.util.AppConstants.CLOUDINARY_SECRET;

public class ImageController {

    public static String postImageToServer(String base64String){
        String[] parts = base64String.split("[,]");
        byte[] decoded = Base64.getDecoder().decode(parts[1]);
        FileOutputStream outputStream = null;

        try {
            String fileExtension = findFileExtension(decoded);
            if(checkFileExtensionAllowed(fileExtension))
            {
                Cloudinary cloudinary = new Cloudinary(ObjectUtils.asMap(
                        "cloud_name", CLOUDINARY_HOME,
                        "api_key", CLOUDINARY_KEY,
                        "api_secret", CLOUDINARY_SECRET
                ));
                Map uploadResult = cloudinary.uploader().upload(decoded, ObjectUtils.emptyMap());
                return (String)uploadResult.get("secure_url");

            }
        } catch (IOException e) {
            e.printStackTrace();
        }
         catch (RuntimeException e) {
            e.printStackTrace();
        } return null;
    }

    private static Boolean checkFileExtensionAllowed(String extension){
        String[] allowedExtensions = {".jpg", ".jpeg", ".png" };
        return Arrays.stream(allowedExtensions).anyMatch(extension::equals);
    }

    private static String findFileExtension(byte[] imageByteArray) throws IOException {
        InputStream is = new ByteArrayInputStream(imageByteArray);
        //Find out image type
        String mimeType = null;
        String fileExtension = null;
        try {
            mimeType = URLConnection.guessContentTypeFromStream(is);
            String delimiter="[/]";
            String[] tokens = mimeType.split(delimiter);
            fileExtension = tokens[1];
        } catch (IOException ioException){
            ioException.printStackTrace();
        }
        return '.' + fileExtension;
    }
}
