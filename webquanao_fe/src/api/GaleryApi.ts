
import GaleryModel from "../models/GaleryModel";
import { my_request } from "./Request";

export async function getAllGalery(product_id: number): Promise<GaleryModel[]> {
    const result: GaleryModel[] = [];

    // Xác định endpoint 
    const endpoint: string = `http://localhost:8080/product/${product_id}/listGalery`;

  
    // Gọi phương thức request
    const response = await my_request(endpoint);
    
 

    
        const responseData = response._embedded.galeries;
        
        
        // console.log(response._embedded);
        // console.log(responseData);

        for (const key in responseData) {
            // Kiểm tra nếu các thuộc tính cần thiết tồn tại
          
                result.push({
                    id: responseData[key].id,
                    imageName: responseData[key].imageName,
                    mainImage: responseData[key].mainImage,
                    link: responseData[key].link,
                    imageData: responseData[key].imageData                
                });
            
        }


        

   

    return result;
}