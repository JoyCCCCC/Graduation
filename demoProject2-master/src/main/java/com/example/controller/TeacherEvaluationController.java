package com.example.controller;

import com.example.domain.TeacherEvaluation;
import com.example.mapper.TeacherEvaluationMapper;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@Api(value = "TeacherEvaluation",tags = "TeacherEvaluation")
public class TeacherEvaluationController {
    @Autowired
    private TeacherEvaluationMapper teacherEvaluationMapper;
    @RequestMapping(value = "/queryTeacherEvaluationList")
    public List<TeacherEvaluation> queryTeacherEvaluationList(){
        return teacherEvaluationMapper.queryTeacherEvaluationList();
    }
    @RequestMapping(value = "/insertTeacher")
    public void insertTeacher(int T_evaluate_id,String Course_name,String Stu_name,String State,String T_Content,int Teacher_id,int Stu_id){
        System.out.println(teacherEvaluationMapper.insertTeacher(T_evaluate_id,Course_name,Stu_name,State,T_Content,Teacher_id,Stu_id));
    }
    @RequestMapping(value = "/updateTeacher")
    public void updateTeacher(int T_evaluate_id,String State,String T_Content){
        System.out.println(teacherEvaluationMapper.updateTeacher(T_evaluate_id,State,T_Content));
    }
    @RequestMapping(value = "/deleteTeacher")
    public void deleteTeacher(int T_evaluate_id){
        System.out.println(teacherEvaluationMapper.deleteTeacher(T_evaluate_id));
    }
}
