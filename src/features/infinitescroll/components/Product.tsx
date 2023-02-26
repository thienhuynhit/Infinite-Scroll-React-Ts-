import React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

export interface ProductProps {
  product: any;
}

export const Product = React.forwardRef<HTMLDivElement>(
  ({ product }: ProductProps, ref) => {
    const content = ref ? (
      <Card
        sx={{
          maxWidth: 345,
          height: 310,
        }}
        ref={ref}
      >
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={product.thumbnail}
            alt={product.catergory}
          />
          <CardContent sx={{ height: 150 }}>
            <Typography gutterBottom variant="h5" component="div">
              {product.title}
            </Typography>
            <Typography variant="body2" noWrap={true} color="text.secondary">
              {product.description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions sx={{ height: 20 }}>
          <Button size="small" color="primary">
            {`product Id:${product.id} new`}
          </Button>
        </CardActions>
      </Card>
    ) : (
      <Card
        sx={{
          maxWidth: 345,
          height: 310,
        }}
      >
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={product.thumbnail}
            alt={product.catergory}
          />
          <CardContent sx={{ height: 150 }}>
            <Typography gutterBottom variant="h5" component="div">
              {product.title}
            </Typography>
            <Typography variant="body2" noWrap={true} color="text.secondary">
              {product.description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions sx={{ height: 20 }}>
          <Button size="small" color="primary">
            {`product Id:${product.id}`}
          </Button>
        </CardActions>
      </Card>
    );
    return content;
  }
);
