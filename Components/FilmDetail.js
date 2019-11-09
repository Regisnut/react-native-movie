import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Animated
} from "react-native";
import { getFilmDetailFromApi, getImageFromApi } from "../Api/TMDBApi";
import { ScrollView } from "react-native-gesture-handler";
import moment from "moment";
//date
import numeral from "numeral";
//chiffres
import { connect } from "react-redux";
import EnlargeShrink from "../Animations/EnlargeShrink";

class FilmDetail extends React.Component {
  state = {
    film: "",
    isLoading: false
  };

  componentDidMount() {
    const favoriteFilmIndex = this.props.favoritesFilm.findIndex(
      item => item.id === this.props.navigation.state.params.idFilm
    );
    if (favoriteFilmIndex !== -1) {
      // Film déjà dans nos favoris, on a déjà son détail
      // Pas besoin d'appeler l'API ici, on ajoute le détail stocké dans notre state global au state de notre component
      this.setState({
        film: this.props.favoritesFilm[favoriteFilmIndex]
      });
      return;
    }
    // Le film n'est pas dans nos favoris, on n'a pas son détail
    // On appelle l'API pour récupérer son détail
    this.setState({ isLoading: true });
    getFilmDetailFromApi(this.props.navigation.state.params.idFilm).then(
      data => {
        this.setState({
          film: data,
          isLoading: false
        });
      }
    );
  }

  _toggleFavorite() {
    const action = { type: "TOGGLE_FAVORITE", value: this.state.film };
    this.props.dispatch(action);
  }

  componentDidUpdate() {
    console.log(this.props.favoritesFilm);
  }

  _displayFavoriteImage() {
    let sourceImage = require("../Images/ic_favorite_border.png");
    let shouldEnlarge = false;
    if (
      this.props.favoritesFilm.findIndex(
        item => item.id === this.state.film.id
      ) !== -1
    ) {
      sourceImage = require("../Images/ic_favorite.png");
      shouldEnlarge = true;
    }
    return (
      <EnlargeShrink shouldEnlarge={shouldEnlarge}>
        <Image source={sourceImage} style={styles.favorite_image} />
      </EnlargeShrink>
    );
  }

  _displayFilm() {
    const film = this.state.film;
    if (film) {
      return (
        <ScrollView style={styles.scrollview_container}>
          <Image
            source={{ uri: getImageFromApi(film.backdrop_path) }}
            style={styles.image}
          />

          <View style={styles.title_container}>
            <Text style={styles.title}>{film.title}</Text>
          </View>

          <TouchableOpacity
            style={styles.favorite_container}
            onPress={() => this._toggleFavorite()}
          >
            {this._displayFavoriteImage()}
          </TouchableOpacity>

          <View>
            <Text style={styles.description_text}> {film.overview}</Text>
          </View>
          <View style={styles.info}>
            <Text style={{ marginTop: 5 }}>
              Sorti le{" "}
              {moment(new Date(film.release_date)).format("DD/MM/YYYY")}
            </Text>
            <Text style={{ marginTop: 5 }}>Note : {film.vote_average}/10</Text>
            <Text style={{ marginTop: 5 }}>
              Nombre de votes : {film.vote_count}
            </Text>
            <Text style={{ marginTop: 5 }}>
              Budget : {numeral(film.budget).format("0,0[.]00 $")}
            </Text>
            <Text style={{ marginTop: 5 }}>
              Genre(s) :{" "}
              {film.genres
                .map(function(genre) {
                  return genre.name;
                })
                .join(" / ")}
            </Text>
            <Text style={{ marginTop: 5 }}>
              Companie(s) :{" "}
              {film.production_companies
                .map(function(company) {
                  return company.name;
                })
                .join(" / ")}
            </Text>
          </View>
        </ScrollView>
      );
    }
  }

  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
  }

  render() {
    return (
      <View style={styles.main_container}>
        {this._displayFilm()}
        {this._displayLoading()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    padding: 5,
    marginTop: 10
  },
  loading_container: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  },
  scrollview_container: {
    flex: 1
  },
  image: {
    height: 170
  },
  title_container: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
    flexWrap: "wrap"
  },
  description_text: {
    fontStyle: "italic",
    color: "grey",
    fontSize: 14
  },
  info: {
    marginTop: 10
  },
  favorite_container: {
    alignItems: "center"
  },
  favorite_image: {
    flex: 1,
    width: null,
    height: null
  }
});

const mapStateToProps = state => {
  return {
    favoritesFilm: state.favoritesFilm
  };
};

export default connect(mapStateToProps)(FilmDetail);
