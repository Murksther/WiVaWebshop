package com.example.WiVaServer.product.payload;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class ImageRequest {
    @NotBlank
    private String base64String;

    public String getText() {
        return base64String;
    }

    public void setText(String base64String) {
        this.base64String = base64String;
    }
}
