package com.example.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import com.example.controller.ResponseResult;

@CrossOrigin
@RestController
@RequestMapping("/file")
public class PictureUploadController {
    @PostMapping("/upload")
    public ResponseResult uploadFile(@RequestParam(value = "file",required = false) MultipartFile file){
        if(file.isEmpty())
        {
            return ResponseResult.fail();
        }
        String OriginalFilename = file.getOriginalFilename();

        String fileName = System.currentTimeMillis()+"."+OriginalFilename.substring(OriginalFilename.lastIndexOf(".")+1);

        String path = "D:\\ECNU\\intelligent-edu-frontend-master\\public\\static";
        File dest=new File(path+fileName);
        if(!dest.getParentFile().exists()){
            dest.getParentFile().mkdirs();
        }
        try{
            file.transferTo(dest);
            return new ResponseResult(200,"文件上传成功",fileName);
        }catch (Exception e){
            e.printStackTrace();
            return ResponseResult.fail();
        }
    }

}
