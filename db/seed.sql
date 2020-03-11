create table product (
    product_id serial primary key,
    name varchar(100),
    description varchar(100),
    price integer,
    image_url text
);
