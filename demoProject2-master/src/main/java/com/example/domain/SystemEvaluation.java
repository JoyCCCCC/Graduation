package com.example.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SystemEvaluation {
    private int S_evaluate_id;
    private String Course_name;
    private String Stu_name;
    private int Count;
    private String S_Content;
    private int Course_id;
    private int Stu_id;


}
