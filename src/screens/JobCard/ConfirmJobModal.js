 <Modal
          animationType="slide"
          transparent={true}
          visible={isAccept}
          onRequestClose={() => {
            setAccept(!isAccept);
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}
          >
            <View
              style={{
                width: '80%',
                backgroundColor: appColors.white,
                borderRadius: 20,
                padding: 20,
                alignItems: 'center',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 5,
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 15 }}>
                Confirm Job Acceptance
              </Text>
              <Text style={{ fontSize: 14, color: appColors.placeholderColor, marginBottom: 20 }}>
                Are you sure you want to accept this job?
              </Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: appColors.black,
                    padding: 10,
                    borderRadius: 10,
                    flex: 1,
                    marginRight: 10,
                  }}
                  onPress={() => {
                    setAccept(false);
                    onAccept();
                  }}
                >
                  <Text style={{ color: appColors.white, textAlign: 'center' }}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    backgroundColor: appColors.white,
                    borderWidth: 1,
                    borderColor: appColors.black,
                    padding: 10,
                    borderRadius: 10,
                    flex: 1,
                  }}
                  onPress={() => setAccept(false)}
                >
                  <Text style={{ color: appColors.black, textAlign: 'center' }}>No</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>