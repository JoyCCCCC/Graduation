package com.example.mapper;

import com.example.domain.TeacherEvaluation;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface TeacherEvaluationMapper {
    List<TeacherEvaluation> queryTeacherEvaluationList();
    int insertTeacher(int T_evaluate_id,String Course_name,String Stu_name,String State,String T_Content,int Teacher_id,int Stu_id);

    int updateTeacher(int T_evaluate_id,String State,String T_Content);

    int deleteTeacher(int T_evaluate_id);
}
