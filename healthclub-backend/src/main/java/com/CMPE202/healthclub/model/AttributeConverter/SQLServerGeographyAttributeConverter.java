package com.CMPE202.healthclub.model.AttributeConverter;

import com.microsoft.sqlserver.jdbc.Geography;
import com.microsoft.sqlserver.jdbc.SQLServerException;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.PersistenceException;
import org.springframework.data.geo.Point;

public class SQLServerGeographyAttributeConverter implements AttributeConverter<Point, byte[]> {
    @Override
    public byte[] convertToDatabaseColumn(Point point) {
        try {
            Geography geography = Geography.point(point.getY(), point.getX(), 4326);
            return geography.serialize();
        } catch (SQLServerException throwables) {
            throwables.printStackTrace();
        }
        return null;
    }

    @Override
    public Point convertToEntityAttribute(byte[] bytes) {
        try {
            Geography geography = Geography.deserialize(bytes);
            double latitude = geography.getLatitude();
            double longitude = geography.getLongitude();
            Point point = new Point(longitude, latitude);
            return point;
        } catch (SQLServerException sqle) {
            // Handle as appropriate
            sqle.printStackTrace();
            throw new PersistenceException("An error occurred while converting Geography to Point", sqle);
        }
    }
}
