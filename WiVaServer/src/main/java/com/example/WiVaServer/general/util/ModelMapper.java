package com.example.WiVaServer.general.util;

import com.example.WiVaServer.product.model.Order;
import com.example.WiVaServer.product.model.OrderedProduct;
import com.example.WiVaServer.product.model.Product;
import com.example.WiVaServer.product.payload.OrderResponse;
import com.example.WiVaServer.product.payload.OrderedProductResponse;
import com.example.WiVaServer.product.payload.ProductResponse;
import com.example.WiVaServer.user.model.Address;
import com.example.WiVaServer.user.payload.AddressResponse;

import java.util.ArrayList;
import java.util.List;


public class ModelMapper {

    public static OrderResponse mapOrderToOrderResponse(Order order){
        OrderResponse orderResponse = new OrderResponse();
        orderResponse.setId(order.getId());
        orderResponse.setOrderPrice(order.getOrderPrice());
        orderResponse.setDeliveryCosts(order.getDeliveryCosts());
        orderResponse.setOrderStatus(order.getOrderStatus());
        orderResponse.setTypeOfTransfer(order.getTypeOfTransfer());
        orderResponse.setMomentOfOrder(order.getMomentOfOrder());
        orderResponse.setCustomerName(order.getUser().getName());
        orderResponse.setAddress(order.getAddress());

        List<OrderedProductResponse> orderedProductResponses = new ArrayList<>();
        List<OrderedProduct> orderedProducts = order.getOrderedProducts();
        orderedProducts.forEach(orderedProduct -> orderedProductResponses.add(ModelMapper.mapOrderedProductResponse(orderedProduct)));
        orderResponse.setOrderedProducts(orderedProductResponses);

        return orderResponse;
    }

    public static OrderedProductResponse mapOrderedProductResponse(OrderedProduct orderedProduct){
        Product product = orderedProduct.getProduct();
        OrderedProductResponse orderedProductResponse = new OrderedProductResponse();
        orderedProductResponse.setId(product.getId());
        orderedProductResponse.setName(product.getName());
        orderedProductResponse.setDescription(product.getDescription());
        orderedProductResponse.setUsedMaterial(product.getUsedMaterial());
        orderedProductResponse.setPrice(product.getPrice());
        orderedProductResponse.setAvailableUnits(product.getAvailableUnits());
        orderedProductResponse.setImages(mergeImages(product));
        orderedProductResponse.setAmountOrdered(orderedProduct.getAmountOrdered());
        return orderedProductResponse;
    }

    public static ProductResponse mapProductToProductResponse(Product product) {
        ProductResponse productResponse = new ProductResponse();
        productResponse.setId(product.getId());
        productResponse.setName(product.getName());
        productResponse.setDescription(product.getDescription());
        productResponse.setUsedMaterial(product.getUsedMaterial());
        productResponse.setPrice(product.getPrice());
        productResponse.setAvailableUnits(product.getAvailableUnits());
        productResponse.setImages(mergeImages(product));

        return productResponse;
    }
    public static AddressResponse mapAddressToAddressResponse(Address address) {
        AddressResponse addressResponse = new AddressResponse();
        addressResponse.setId(address.getId());
        addressResponse.setStreetName(address.getStreetName());
        addressResponse.setHouseNumber(address.getHouseNumber());
        addressResponse.setSuffix(address.getSuffix());
        addressResponse.setPostalCode(address.getPostalCode());
        addressResponse.setCity(address.getCity());

        return addressResponse;
    }

    private static List<String> mergeImages(Product product){
        List<String> imageList = new ArrayList<>();

        for(int i = 0; i < product.getAmountOfImages();i++)
            imageList.add(product.getImage((i+1))
        );

        return imageList;
    }
}
