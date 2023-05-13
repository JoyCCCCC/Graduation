package com.example.mapper;

import com.example.domain.SystemEvaluation;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface SystemEvaluationMapper {
    List<SystemEvaluation> querySystemEvaluationList();
    int insertSystem(int S_evaluate_id,String Course_name,String Stu_name,int Count,String S_Content,int Course_id,int Stu_id);

    int deleteSystem(int S_evaluate_id);

}
