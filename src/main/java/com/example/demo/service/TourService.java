package com.example.demo.service;

import com.example.demo.jdo.Tour;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Service
public class TourService {
    private NamedParameterJdbcTemplate namedParameterJdbcTemplate;
    private JdbcTemplate jdbcTemplate;

    @Autowired
    public void setJdbcTemplate(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }
    @Autowired
    public void setNamedParameterJdbcTemplate(NamedParameterJdbcTemplate namedParameterJdbcTemplate) {
        this.namedParameterJdbcTemplate = namedParameterJdbcTemplate;
    }

    @PostConstruct
    public void initBd() {

        jdbcTemplate.execute(INIT_DB);
    }

    private final static String INIT_DB="CREATE SCHEMA IF NOT EXISTS SA;\n" +
            "\n" +
            "DROP TABLE IF EXISTS SA.TOURLIST;\n" +
            "\n" +
            "CREATE TABLE IF NOT EXISTS SA.TOURLIST\n" +
            "(TOUR_ID identity,\n" +
            " NAME VARCHAR,\n" +
            " DESCRIPTION VARCHAR,\n" +
            " LOCATION VARCHAR,\n" +
            " START_DATE DATE,\n" +
            " END_DATE DATE,\n" +
            " COUNT_LIMIT NUMBER\n" +
            ");\n" +
            "\n" +
            "INSERT INTO SA.TOURLIST (NAME,DESCRIPTION,LOCATION,START_DATE,END_DATE,COUNT_LIMIT) VALUES ('TOUR1', 'DESC1', 'RUSSIA', to_date('01.01.2019', 'dd.mm.yyyy'), to_date('14.01.2019', 'dd.mm.yyyy'),100);\n" +
            "INSERT INTO SA.TOURLIST (NAME,DESCRIPTION,LOCATION,START_DATE,END_DATE,COUNT_LIMIT) VALUES ('TOUR2', 'DESC2', 'USA', to_date('01.02.2019', 'dd.mm.yyyy'), to_date('14.02.2019', 'dd.mm.yyyy'),2);\n" +
            "INSERT INTO SA.TOURLIST (NAME,DESCRIPTION,LOCATION,START_DATE,END_DATE,COUNT_LIMIT) VALUES ('TOUR3', 'DESC2', 'ITALY', to_date('01.03.2019', 'dd.mm.yyyy'), to_date('14.03.2019', 'dd.mm.yyyy'),3);\n"+
            "INSERT INTO SA.TOURLIST (NAME,DESCRIPTION,LOCATION,START_DATE,END_DATE,COUNT_LIMIT) VALUES ('TOUR3', 'DESC3', 'ITALY', to_date('01.03.2019', 'dd.mm.yyyy'), to_date('14.03.2019', 'dd.mm.yyyy'),3);\n";


    public List<Tour> getAllTours() {
        return namedParameterJdbcTemplate.query("SELECT * FROM SA.TOURLIST", new TourMapper());
    }

    private static class TourMapper implements RowMapper<Tour> {

        @Override
        public Tour mapRow(ResultSet resultSet, int i) throws SQLException {
            Tour tour = new Tour();
            tour.setTourId(resultSet.getLong("tour_id"));
            tour.setName(resultSet.getString("name"));
            tour.setDescription(resultSet.getString("description"));
            tour.setLocation(resultSet.getString("location"));
            tour.setStartDate(resultSet.getDate("start_date"));
            tour.setEndDate(resultSet.getDate("end_date"));
            tour.setCountLimit(resultSet.getInt("count_limit"));
            return tour;
        }

    }

}
