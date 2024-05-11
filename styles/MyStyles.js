import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})

export const patterns = StyleSheet.create({
    pattern: {
        flex: 1,
      },
      centeredContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
        marginBottom: 30,
      },centeredContainer2: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
      },
      centerText: {
        fontSize: 25,
        color: 'whitesmoke', 
        textAlign: 'center', 
        padding: 25, 
        borderRadius: 10, 
        backgroundColor: '#0055A8',
        fontWeight: "bold"
      },
      centerText2: {
        fontSize: 25,
        color: 'whitesmoke', 
        textAlign: 'center', 
        paddingHorizontal: 25, 
        borderRadius: 10, 
        backgroundColor: '#0055A8',
        fontWeight: "bold"
      },
      list:{
        padding: 25, 
        borderColor: 'green', 
        marginBottom: 1
    
      },
      list_2:{
        padding: 35, 
        borderColor: 'green', 
        marginBottom: 1
    
      },
      leftAlignedContainer: {
        alignItems: 'flex-start',
      },
      searchInput:{
        padding: 5,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "black",
        fontSize: 16,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10
      },
      text_header:{
        fontSize: 25,
        color: 'red',
        fontWeight: 'bold',
        
      },
      box:{
    shadowColor: '#000000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
      },
      text_bold:{
        fontWeight: "bold",
        color: 'white'
      },
      list_kl:{textAlign: "center",
      marginBottom: 30,
      backgroundColor: "#00A855",
      padding: 30,
      fontWeight: "bold"
      },
      btn_creatediem:{
        textAlign: "center",
                        marginBottom: 30,
                        backgroundColor: "#F79E02",
                        padding: 20,
                        color: "white",
      }
})